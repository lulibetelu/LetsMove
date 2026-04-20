import type { PostType } from '../types/postTypes'
import {Link, type NavigateFunction, useNavigate} from 'react-router-dom';
import {CircleUserRound, MessageCircle} from 'lucide-react';
import Like from "./Like.tsx";
import Dislike from "./Dislike.tsx";
import {useState} from "react";
import NewComment from "./NewComment.tsx";

type Props = PostType & {
    isForPostPage: boolean
}

export default function Post({ user: {username}, content, id, userId, isLiked, isDisliked, isForPostPage } : Props){
    const [createComment, setCreateComment] = useState(false);
    const navigate: NavigateFunction = useNavigate();
    const handleClick = () => {

        navigate('/post/id', {
            state: {data}
        });
    }

    const data: Partial<PostType> = {
        id: id,
        userId: userId,
        content: content,
        user: {username: username},
        isLiked: isLiked,
        isDisliked: isDisliked,

    }

    return (
        <article className="flex w-full flex-col px-5 py-4" onClick={isForPostPage? () => {} : () => {handleClick()}}>
            <div className="flex items-center gap-3 mb-2">
                <div className="text-base-content/70 flex items-center"><CircleUserRound size={20} strokeWidth={1.5} /></div>
                {/*e.stopPropagation es para que el click vaya efectivamente al perfil y no a la pagina del post.*/}
                <div> <Link to={`/profile/${userId}`} onClick={(e) => e.stopPropagation()} className="font-semibold hover:underline" >{username}</Link> </div>
            </div>
            <div className="mb-3">
                <p className="break-words whitespace-pre-wrap text-base-content/90">
                    {content}
                </p>
            </div>
            <hr className="w-full border-base-300 mb-3"/>
            <div className="flex items-center gap-6 text-base-content/70" onClick={(e) => e.stopPropagation()}>
                <Like postId={id} initialIsLiked={isLiked}/>
                <Dislike postId={id} initialIsDisliked={isDisliked}/>
                <button type="button" className="flex cursor-pointer items-center gap-1 transition-colors hover:text-primary" onClick={() => setCreateComment(true)}>
                    <MessageCircle size={20} strokeWidth={1.5}/>
                </button>
                {createComment && <NewComment postAuthorUsername={username} onClose={() => setCreateComment(false)} onCommentCreated={handleClick}/>}
            </div>
        </article>

    )}