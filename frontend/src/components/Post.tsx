import type { PostType } from '../types/postTypes'
import { Link } from 'react-router-dom';
import {CircleUserRound, MessageCircle, Trash2} from 'lucide-react';
import Like from "./Like.tsx";
import Dislike from "./Dislike.tsx";
export default function Post({ user: {username}, content, id, userId, isLiked, isDisliked, canDelete, deletePost } : PostType){
    return (

        <article className="flex w-full flex-col px-5 py-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="text-base-content/70 flex items-center"><CircleUserRound size={20} strokeWidth={1.5} /></div>
                <div> <Link to={`/profile/${userId}`} className="font-semibold hover:underline" >{username}</Link> </div>
                {canDelete && (
                    <button type="button" onClick={deletePost} className="ml-auto text-base-content/70 hover:text-error transition-colors" aria-label="Eliminar post">
                        <Trash2 size={20} strokeWidth={1.5} />
                    </button>
                )}
            </div>
            <div className="mb-3">
                <p className="break-words whitespace-pre-wrap text-base-content/90">
                    {content}
                </p>
            </div>
            <hr className="w-full border-base-300 mb-3"/>
            <div className="flex items-center gap-6 text-base-content/70">
                <Like postId={id} initialIsLiked={isLiked}/>
                <Dislike postId={id} initialIsDisliked={isDisliked}/>
                <button type="button" className="hover:text-primary transition-colors flex items-center gap-1" aria-label="Comentar">
                    <MessageCircle size={20} strokeWidth={1.5} /> </button>
            </div>
        </article>

    )}