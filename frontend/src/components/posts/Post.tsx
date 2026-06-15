import type { PostType } from '../../types/postTypes.ts'
import {type NavigateFunction, useNavigate} from 'react-router-dom';
import {CircleUserRound, MessageCircle, Trash2} from 'lucide-react';
import LikeButton from "../buttons/LikeButton.tsx";
import DislikeButton from "../buttons/DislikeButton.tsx";
import {useState} from "react";
import NewComment from "../create/NewComment.tsx";
import ProfileLink from "../profile/ProfileLink.tsx";
type Props = PostType & {
    isForPostPage: boolean,
    onCommentCreate?: () => void,
    onCommentClick?: () => void,
}

export default function Post({ user: {username}, content, id, userId, isLiked, isDisliked, canDelete, deletePost, isForPostPage, onCommentCreate, onCommentClick, images } : Props){
    const url = import.meta.env.VITE_API_URL;
    const [createComment, setCreateComment] = useState(false);
    const navigate: NavigateFunction = useNavigate();
    const handleClick = () => {
        if (onCommentCreate) {
            onCommentCreate();
        }
        navigate(`/post/${id}`, {
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

        <article className="flex w-full flex-col px-6 py-5"
                 onClick={isForPostPage? () => {} : () => {handleClick()}}
        >
            <div className="flex items-center gap-3 mb-3">
                <CircleUserRound size={20} strokeWidth={1.5} className="text-white/40" />
                 <ProfileLink username={username} userId={userId}/>
                {canDelete && (
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); deletePost?.(); }}
                        className="ml-auto text-white/30 hover:text-red-400 transition-colors"
                        aria-label="Eliminar post"
                    >
                        <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                )}
            </div>


            <p className="break-words whitespace-pre-wrap text-white/80 text-sm leading-relaxed mb-4">
                {content}
            </p>

            {images && images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {images.map((img, i) => (
                        <img key={i} src={img.image.url ?? `${url}image/${img.image.id}`} alt="" className="w-full h-48 object-cover rounded-xl"/>
                    ))}
                </div>
            )}

            <div
                className="flex items-center gap-6 text-white/40 border-t border-white/5 pt-3 mt-2"
                onClick={(e) => e.stopPropagation()}
            >
                <LikeButton postId={id} initialIsLiked={isLiked}/>
                <DislikeButton postId={id} initialIsDisliked={isDisliked}/>
                <button
                    type="button"
                    className="flex cursor-pointer items-center gap-1 transition-all duration-300 rounded-full p-0.5 text-white/70 hover:text-[#8A9A5B]"
                    aria-label="Comment"
                    onClick={() => {
                        navigate(`/post/${id}`, {
                            state: {data}
                        });
                        // if (isForPostPage && onCommentClick) {
                        //     onCommentClick();
                        // } else {
                        //     setCreateComment(true);
                        // }
                    }}
                >
                    <MessageCircle size={16} strokeWidth={1.5} className="transition-transform active:scale-125"/>
                </button>
                {(!isForPostPage || !onCommentClick) && createComment && (
                    <NewComment
                        postId={id}
                        postAuthorUsername={username}
                        onClose={() => setCreateComment(false)}
                        onCommentCreated={handleClick}
                    />
                )}
            </div>
        </article>

    )}