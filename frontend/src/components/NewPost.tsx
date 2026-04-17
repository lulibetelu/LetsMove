import {Image, CircleUserRound} from 'lucide-react';
import type {NewPostCredentials} from "../types/postTypes.ts";
import {create} from "../api/post.ts";
import {useState} from "react";
import {UseUsername} from "./UseUsername.ts";


export default function NewPost({ onClose, onPostCreated }: { onClose: () => void, onPostCreated: () => void}){
    const [content, setContent] = useState("");

    const { username, loading } = UseUsername();

    const handleSubmit : React.SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            const postCredentials: NewPostCredentials = {content};
            const createPost = await create(postCredentials);
            console.log("CREATE POST:", createPost);
            onClose();
            onPostCreated();
        } catch {
            // setError(true);
        }

    };

    return (
        <dialog className="modal modal-open backdrop-blur-sm">
            <form className="modal-box bg-base-100 p-0 overflow-hidden max-w-lg w-full" onSubmit={handleSubmit}>

                <div className="p-4 flex gap-4">
                    <div className="avatar placeholder">
                        <div className="w-12 h-12 rounded-full bg-base-300 text-base-content/70 flex items-center justify-center">
                            <CircleUserRound size={24} strokeWidth={1.5} />
                        </div>
                    </div>
                    <div>
                        {loading? 'loading' : username}
                    </div>
                </div>

                <textarea
                    name="content"
                    aria-label="Post content"
                    className="textarea textarea-ghost w-full text-lg resize-none focus:outline-none focus:bg-transparent"
                    placeholder="What do you want to talk about?"
                    onChange ={(e) => {
                        setContent(e.target.value)
                    }}
                ></textarea>

                <div className="flex justify-between items-center w-full p-3 border-t border-base-200 bg-base-50">

                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:text-base-content"
                            aria-label="Add image"
                        ><Image size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-neutral btn-sm px-6 rounded-full font-medium"
                    >
                        Post
                    </button>
                </div>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>Cerrar</button>
            </form>
        </dialog>
    );
}