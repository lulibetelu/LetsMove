import {CircleUserRound} from 'lucide-react';
import type {NewPostCredentials} from "../../types/postTypes.ts";
import {create} from "../../api/post.ts";
import {useEffect, useState} from "react";
import {useUsername} from "../../hooks/UseUsername.ts";
import PopUpError from "../PopUpError.tsx";
import {findAllSports} from "../../api/sport.ts";
import type {Sport} from "../../types/sportType.ts";
import type {ImageInput} from "../../types/imageType.ts";
import ImagePicker from "../ImagePicker.tsx";


export default function NewPost({ onClose }: { onClose: () => void}){
    const [content, setContent] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [sports, setSports] = useState<Sport[]>([]);
    const [selectedSports, setSelectedSports] = useState<Sport[]>([])
    const [images, setImages] = useState<ImageInput[]>([])

    const { username, loading } = useUsername();

    const toggleSport = (sportId: number, sportName: string) => {
        setSelectedSports(prev =>
            prev.some(sport => sport.id === sportId)
                ? prev.filter(sport => sport.id !== sportId)
                : [...prev, { id: sportId, name: sportName }]
        );
    };

    const handleSubmit : React.SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            const selectedSportsId = selectedSports.map((sport) =>
                sport.id,
            );
            const postCredentials: NewPostCredentials = {content, selectedSportsId, images};
            const createPost = await create(postCredentials);
            console.log("CREATE POST:", createPost);
            onClose();
        } catch {
            setError(true);
        }
    };

    useEffect(() => {
        async function loadSports() {
            try {
                const sportsResponse = await findAllSports();
                setSports(sportsResponse.sports);
            } catch {
                setError(true);
            }
        }
        loadSports();
    },[]);

    return (
        <dialog className="modal modal-open backdrop-blur-sm">
            <form className="modal-box bg-[#141414] p-0 overflow-hidden max-w-lg w-full flex flex-col h-auto max-h-[80vh]" onSubmit={handleSubmit}>

                <div className="p-4 flex gap-4 items-center shrink-0">
                    <div className="avatar placeholder">
                        <div className="w-12 h-12 rounded-full bg-base-300 text-base-content/70 flex items-center justify-center">
                            <CircleUserRound size={24} strokeWidth={1.5} />
                        </div>
                    </div>
                    <div className="font-medium">
                        {loading? 'loading' : username}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4">
                    <textarea
                        name="content"
                        aria-label="Post content"
                        className="textarea textarea-ghost w-full text-lg resize-none focus:outline-none focus:bg-transparent min-h-[120px]"
                        placeholder="What do you want to talk about?"
                        value={content}
                        onChange ={(e) => {
                            setContent(e.target.value)
                        }}
                    ></textarea>

                    <div className="pb-4">
                        <p className="text-sm font-semibold mb-3 text-base-content/80">
                            Select related sports <span className="text-error">*</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {sports.map((sport) => {
                                const isSelected = selectedSports.some(s => s.id === sport.id);
                                return (
                                    <button
                                        type="button"
                                        key={sport.id}
                                        onClick={() => toggleSport(sport.id, sport.name)}
                                        className={`badge badge-lg cursor-pointer transition-colors border-none text-sm py-4 px-4 font-medium ${
                                            isSelected
                                                ? 'bg-[#8A9A5B] text-white hover:bg-[#728249]'
                                                : 'bg-base-200 text-base-content/70 hover:bg-base-300'
                                        }`}
                                    >
                                        {sport.name}
                                    </button>
                                );
                            })}
                        </div>
                        {selectedSports.length === 0 && (
                            <p className="text-xs text-error mt-2">You must select at least one sport to post.</p>
                        )}
                    </div>

                    <div className="pb-4">
                        <ImagePicker images={images} onChange={setImages} layout="row"/>
                    </div>
                </div>

                <div className="flex justify-end items-center w-full p-3 border-t border-base-200 bg-base-50 shrink-0">
                    <button
                        type="submit"
                        disabled={selectedSports.length === 0}
                        className="btn bg-[#8A9A5B] hover:bg-[#728249] text-white btn-sm px-6 rounded-full font-medium border-none disabled:bg-base-300 disabled:text-base-content/40"
                    >
                        Post
                    </button>
                </div>
                <div>
                    {error && <PopUpError message='Failed to create post'/>}
                </div>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>Cerrar</button>
            </form>
        </dialog>
    );
}