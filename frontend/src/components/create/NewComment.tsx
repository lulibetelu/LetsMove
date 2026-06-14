import {useState} from "react";
import {useUsername} from "../../hooks/UseUsername.ts";
import {CircleUserRound, Image} from "lucide-react";
import PopUpError from "../PopUpError.tsx";
import type {CreateComment} from "../../types/commentTypes.ts";
import {createComment} from "../../api/comment.ts";

export interface Props{
    onClose: () => void,
    onCommentCreated: () => void,
    postAuthorUsername: string,
    postId: number,
}

export default function NewComment(props: Props){
    const [content, setContent] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const { username, loading } = useUsername();


    const handleSubmit : React.SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            const commentData: CreateComment = {
                postId: props.postId,
                content: content,
            };
             const createPost = await createComment(commentData);
             console.log(createPost);
            props.onClose();
            props.onCommentCreated();
        } catch {
            setError(true);
        }

    };

    return (
        <dialog className="modal modal-open backdrop-blur-sm">
            <form className="modal-box bg-[#141414] p-0 overflow-hidden max-w-lg w-full" onSubmit={handleSubmit}>

                <div className="p-4 flex gap-4">
                    <div className="avatar placeholder">
                        <div className="w-12 h-12 rounded-full bg-white/10 text-white/70 flex items-center justify-center">
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
                    className="textarea textarea-ghost bg-white/5 w-full text-lg resize-none focus:outline-none focus:bg-white/5"
                    placeholder={`Answer ${props.postAuthorUsername}`}
                    onChange ={(e) => {
                        setContent(e.target.value)
                    }}
                ></textarea>

                <div className="flex justify-between items-center w-full p-3 border-t border-white/10">

                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="btn bg-white/5 hover:bg-white/10 text-white/70 hover:text-white btn-circle btn-sm border-none"
                            aria-label="Add image"
                        ><Image size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="btn bg-white/10 hover:bg-white/20 text-white btn-sm px-6 rounded-full font-medium border-none"
                    >
                        Comment
                    </button>
                </div>
                <div>
                    {error && <PopUpError message='Failed to create post'/>}
                </div>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button onClick={props.onClose}>Cerrar</button>
            </form>
        </dialog>
    );
}