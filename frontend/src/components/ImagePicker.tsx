import {Image, Link, Upload, X} from 'lucide-react';
import {useRef, useState} from 'react';
import type {ImageInput} from "../types/imageType.ts";

interface Props {
    images: ImageInput[];
    onChange: (images: ImageInput[]) => void;
    allowDescription?: boolean;
    max?: number;
    forcedDescription?: string;
    layout?: 'grid' | 'row';
}

export default function ImagePicker({images, onChange, allowDescription = false, max, forcedDescription, layout = 'grid'}: Props) {
    const [open, setOpen] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    // este es el componente que viene hecho del browser que te abre el filesystem para elegir imagenes
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const remaining = max ? max - images.length : files.length;
        const allowed = files.slice(0, remaining);

        Promise.all(
            allowed.map(file => new Promise<ImageInput>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const img: ImageInput = {content: reader.result as string};
                    if (forcedDescription) img.description = forcedDescription;
                    resolve(img);
                };
                reader.readAsDataURL(file);
            }))
        ).then(newImages => {
            onChange([...images, ...newImages]);
        });

        e.target.value = '';
        setOpen(false);
    };

    const handleAddUrl = () => {
        if (!urlInput.trim()) return;
        if (max && images.length >= max) return;
        const img: ImageInput = {url: urlInput.trim()};
        if (forcedDescription) img.description = forcedDescription;
        onChange([...images, img]);
        setUrlInput('');
        setOpen(false);
    };

    const handleRemove = (index: number) => {
        onChange(images.filter((_, i) => i !== index));
    };

    const handleDescriptionChange = (index: number, description: string) => {
        onChange(images.map((img, i) => i === index ? {...img, description} : img));
    };

    return (
        <div className="flex flex-col gap-2">

            {/* Botón para abrir el picker */}
            {(!max || images.length < max) && (
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-dashed border-white/20 hover:border-white/30 text-white/40 hover:text-white/60 text-sm transition-all"
                >
                    <Image size={16}/> Add images
                </button>
            )}

            {/* Popover */}
            {open && (
                <div className="bg-[#1e1e1e] border border-white/10 rounded-xl p-4 flex flex-col gap-3 shadow-xl">

                    {/* Subir desde dispositivo */}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white/60 hover:text-white/80 transition-all"
                    >
                        <Upload size={15}/> Upload from device
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple={!max || max > 1}
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    {/* URL */}
                    <div className="flex gap-2">
                        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                            <Link size={13} className="text-white/30 shrink-0"/>
                            <input
                                type="text"
                                placeholder="Paste image's URL"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                className="bg-transparent text-sm text-white/70 placeholder:text-white/25 focus:outline-none w-full"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddUrl}
                            disabled={!urlInput.trim()}
                            className="px-3 py-2 rounded-xl text-xs font-semibold text-white disabled:opacity-30 transition-all"
                            style={{background: "linear-gradient(135deg, #8A9A5B, #6b7a46)"}}
                        >
                            Add
                        </button>
                    </div>
                </div>
            )}

            {/* Preview de imágenes seleccionadas */}
            {images.length > 0 && layout === 'row' && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, i) => (
                        <div key={i} className="relative group shrink-0">
                            <div className="w-14 h-14 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                                <img
                                    src={img.content ?? img.url}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-opacity">
                                <button
                                    type="button"
                                    onClick={() => handleRemove(i)}
                                    className="p-0.5 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-all active:scale-90"
                                >
                                    <X size={12}/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {images.length > 0 && layout === 'grid' && (
                <div className="grid grid-cols-3 gap-2">
                    {images.map((img, i) => (
                        <div key={i} className="relative group rounded-xl overflow-hidden bg-white/5 border border-white/10">
                            <div className="aspect-square">
                                <img
                                    src={img.content ?? img.url}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={() => handleRemove(i)}
                                    className="p-1.5 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-all active:scale-90"
                                >
                                    <X size={16}/>
                                </button>
                            </div>
                            {allowDescription && !forcedDescription && (
                                <div className="absolute bottom-0 left-0 right-0 p-1">
                                    <select
                                        value={img.description ?? ''}
                                        onChange={(e) => handleDescriptionChange(i, e.target.value)}
                                        className="w-full text-xs bg-black/60 border border-white/10 rounded-lg px-1.5 py-1 text-white/80 focus:outline-none cursor-pointer"
                                    >
                                        <option value="">Without description</option>
                                        <option value="Cover">Cover</option>
                                        <option value="Gallery">Gallery</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}