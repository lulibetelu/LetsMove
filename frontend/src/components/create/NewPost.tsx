import {CircleUserRound} from 'lucide-react';
import type {NewPostCredentials} from "../../types/postTypes.ts";
import {create} from "../../api/post.ts";
import {useState} from "react";
import {useUsername} from "../../hooks/UseUsername.ts";
import PopUpError from "../PopUpError.tsx";
import type {ImageInput} from "../../types/imageType.ts";
import ImagePicker from "../ImagePicker.tsx";
import Dropdown from "../Dropdown.tsx";
import {useSports} from "../../hooks/useSports.ts";
import {sportsToString} from "../../resusable-functions/sportFunctions.ts";

export default function NewPost({ onClose }: { onClose: () => void}){
    const [content, setContent] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [images, setImages] = useState<ImageInput[]>([]);
    const [selectedSports, setSelectedSports] = useState<string[]>([]);

    const { username, loading } = useUsername();
    const {sports, isPending, sportError} = useSports();

    const handleSubmit : React.SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            const selectedSportsId = selectedSports.map(name =>
                sports.find(s => s.name === name)!.id
            );
            const postCredentials: NewPostCredentials = {content, selectedSportsId, images};
            await create(postCredentials);
            onClose();
        } catch {
            setError(true);
        }
    };

    return (
        <dialog className="modal modal-open backdrop-blur-sm">
            <form className="modal-box bg-[#141414] p-0 overflow-hidden max-w-lg w-full flex flex-col h-auto max-h-[80vh]" onSubmit={handleSubmit}>

                <div className="p-4 flex gap-4 items-center shrink-0 border-b border-white/10">
                    <div className="avatar placeholder">
                        <div className="w-12 h-12 rounded-full bg-white/10 text-white/70 flex items-center justify-center">
                            <CircleUserRound size={24} strokeWidth={1.5} />
                        </div>
                    </div>
                    <div className="font-medium">
                        {loading ? 'loading' : username}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5">
                    <textarea
                        name="content"
                        aria-label="Post content"
                        className="textarea textarea-ghost bg-white/5 w-full text-lg resize-none focus:outline-none focus:bg-white/5 min-h-[140px] leading-relaxed"
                        placeholder="What do you want to talk about?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <Dropdown
                        dataList={sportsToString(sports)}
                        error={sportError}
                        isPending={isPending}
                        value={selectedSports}
                        handleChange={(v) => setSelectedSports(v as string[])}
                        multiple
                    />

                    <div>
                        <ImagePicker images={images} onChange={setImages} layout="row"/>
                    </div>
                </div>

                <div className="flex justify-end items-center w-full p-3 border-t border-white/10 shrink-0">
                    <button
                        type="submit"
                        disabled={selectedSports.length === 0}
                        className="
                            btn bg-[#8A9A5B] hover:bg-[#728249] text-white btn-sm px-6
                            rounded-full font-medium border-none
                            disabled:bg-white/5 disabled:text-white/40
                            transition-all duration-200 hover:scale-105 active:scale-95
                        "
                    >
                        Post
                    </button>
                </div>

                {error && <PopUpError message='Failed to create post'/>}
            </form>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>Cerrar</button>
            </form>
        </dialog>
    );
}