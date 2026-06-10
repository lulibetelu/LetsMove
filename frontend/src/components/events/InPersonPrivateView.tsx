import type {EventSignUp, EventType} from "../../types/eventTypes.ts";
import {useState} from "react";
import {CalendarDays, MapPin, UserCircle, Users} from "lucide-react";
import {addGalleryImage, exitEvent, findEventParticipants, getGalleryImages} from "../../api/event.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {formatDate} from "../../resusable-functions/formatDate.ts";
import {formatTime} from "../../resusable-functions/formatTime.ts";
import PopUpError from "../PopUpError.tsx";
import EditButton from "../buttons/EditButton.tsx";
import DeleteButton from "../buttons/DeleteButton.tsx";
import ImagePicker from "../ImagePicker.tsx";
import type {ImageEvent} from "../../types/imageType.ts";
import type {ImageInput} from "../../types/imageType.ts";

interface Props {
    event: EventType;
    isHost: boolean;
    onLeft: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function InPersonPrivateView({event, isHost, onLeft, onEdit, onDelete}: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [galleryImages, setGalleryImages] = useState<ImageInput[]>([]);
    const [uploading, setUploading] = useState(false);
    const [galleryError, setGalleryError] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const url = import.meta.env.VITE_API_URL;

    const {data: participants} = useQuery({
        queryKey: ['eventParticipants', event.id],
        queryFn: () => findEventParticipants(event.id),
    });

    const {data: existingGallery} = useQuery({
        queryKey: ['eventGallery', event.id],
        queryFn: () => getGalleryImages(event.id),
    });

    const acceptedParticipants = participants?.filter(
        (p: EventSignUp) => p.state === 'Accepted'
    ) ?? [];

    const handleLeave = async () => {
        setLoading(true);
        setError(null);
        try {
            await exitEvent(event.id);
            onLeft();
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleUploadGallery = async () => {
        if (galleryImages.length === 0) return;
        setUploading(true);
        setGalleryError(null);
        try {
            for (const img of galleryImages) {
                await addGalleryImage(event.id, img);
            }
            setGalleryImages([]);
            queryClient.invalidateQueries({queryKey: ['eventGallery', event.id]});
        } catch {
            setGalleryError('Failed to upload images');
        } finally {
            setUploading(false);
        }
    };

    const coverImage = event.imageEvents?.find(img => img.description === "Cover");

    return (
        <div className="max-w-5xl mx-auto py-10 px-6">

            {/* Cover */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6">
                {coverImage ? (
                    <img src={coverImage.image.url ?? `${url}image/${coverImage.image.id}`} alt={event.title} className="w-full h-full object-cover"/>
                ) : (
                    <div className="w-full h-full" style={{background: "linear-gradient(135deg, #8A9A5B 0%, #6b7a46 100%)"}}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <CalendarDays size={120} strokeWidth={0.8}/>
                        </div>
                    </div>
                )}
                <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/80 border border-white/10">
                        In Person
                    </span>
                </div>
            </div>

            {/* Title + host */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white/90 leading-tight mb-2">{event.title}</h1>
                <div className="flex items-center gap-2">
                    <UserCircle size={16} strokeWidth={1.5} className="text-white/30"/>
                    <span className="text-sm text-white/40">Hosted by</span>
                    <span className="text-sm font-semibold text-[#8A9A5B]">{event.host.username}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left column */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white/30">Description</h2>
                        <p className="text-sm text-white/60 leading-relaxed">{event.description}</p>
                    </div>

                    {/* Participants */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-white/30">Participants</h2>
                            {acceptedParticipants.length > 0 && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8A9A5B]/10 text-[#8A9A5B]">
                                    {acceptedParticipants.length}
                                </span>
                            )}
                        </div>

                        {acceptedParticipants.length === 0 ? (
                            <div className="flex items-center gap-2 text-white/20 py-4">
                                <Users size={18} strokeWidth={1}/>
                                <p className="text-sm">No participants yet</p>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                {acceptedParticipants.map((p: EventSignUp) => (
                                    <div key={p.userId} className="flex items-center gap-2 bg-[#1e1e1e] border border-white/5 rounded-full px-3 py-1.5">
                                        <UserCircle size={16} strokeWidth={1.5} className="text-white/30"/>
                                        <span className="text-xs font-medium text-white/60">{p.user.username}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Gallery */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white/30">Gallery</h2>

                        {/* Existing gallery images */}
                        {existingGallery && existingGallery.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {existingGallery.map((imgEvent: ImageEvent) => (
                                    <div key={imgEvent.image.id} className="aspect-square rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/5">
                                        <img
                                            src={imgEvent.image.url ?? `${url}image/${imgEvent.image.id}`}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Upload area */}
                        <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                            <ImagePicker images={galleryImages} onChange={setGalleryImages} />
                            {galleryImages.length > 0 && (
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleUploadGallery}
                                        disabled={uploading}
                                        className="px-4 py-1.5 rounded-full text-xs font-semibold text-white transition-all active:scale-95 disabled:opacity-40"
                                        style={{background: "linear-gradient(135deg, #8A9A5B, #6b7a46)"}}
                                    >
                                        {uploading ? "Uploading..." : `Upload ${galleryImages.length} image${galleryImages.length > 1 ? 's' : ''}`}
                                    </button>
                                </div>
                            )}
                            {galleryError && <PopUpError message={galleryError} />}
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="flex flex-col gap-4">
                    <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-5 flex flex-col gap-4">

                        {/* Date */}
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A9A5B]">Date</span>
                            <p className="text-sm text-white/70">{formatDate(event.startingDate)}</p>
                            <p className="text-xs text-white/40">{formatTime(event.startingDate)}</p>
                        </div>

                        {/* Location */}
                        {event.location && (
                            <div className="flex items-start gap-2 pt-3 border-t border-white/5">
                                <MapPin size={14} className="text-[#8A9A5B] shrink-0 mt-0.5"/>
                                <p className="text-sm text-white/50">{event.location.location}</p>
                            </div>
                        )}

                        {/* Host */}
                        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                            <UserCircle size={14} strokeWidth={1.5} className="text-white/30 shrink-0"/>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Hosted by</p>
                                <p className="text-sm text-white/70">{event.host.username}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        {isHost ? (
                            <div className="flex gap-2 pt-3 border-t border-white/5">
                                <EditButton handleClick={() => onEdit?.()}/>
                                <DeleteButton handleClick={() => onDelete?.()}/>
                            </div>
                        ) : (
                            <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
                                <button
                                    onClick={handleLeave}
                                    disabled={loading}
                                    className="w-full py-2.5 rounded-xl text-sm font-semibold border border-red-400/30 text-red-400 hover:bg-red-400/10 transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {loading ? "Leaving..." : "Leave Event"}
                                </button>
                                {error && <PopUpError message={error} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
