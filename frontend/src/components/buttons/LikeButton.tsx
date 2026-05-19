import {ThumbsUp} from "lucide-react";
import {createLike, removeLike} from "../../api/like.ts";
import {useState} from "react";
import type {ActionValidatorResponse} from "../../types/actionValidatorResponse.ts";

export default function LikeButton({postId, initialIsLiked} : {postId: number, initialIsLiked: boolean}){
    const [isLiked, setLike] = useState(initialIsLiked);
    return(
        <button
            type="button"
            className={`group flex cursor-pointer items-center gap-2 transition-all duration-300 rounded-full p-1 ${isLiked ? 'text-[#8A9A5B]'
                : 'text-base-content/70 hover:text-[#8A9A5B]'}`}
            aria-label={isLiked ? "Quitar me gusta" : "Me gusta"}
            onClick={async () => {
            try {
                let actionValidatorResponse: ActionValidatorResponse;
                if (!isLiked){
                     actionValidatorResponse = await createLike(postId);

                }else {
                     actionValidatorResponse = await  removeLike(postId);
                }
                if (!actionValidatorResponse.error) setLike(!isLiked);
            } catch (error) {
                console.error("Failed to update like status", error);
            }
        }}>
            <ThumbsUp
                size={20}
                strokeWidth={isLiked ? 2 : 1.5}
                fill={isLiked ? "#8A9A5B" : "none"}
                className="transition-transform active:scale-125"
            />
        </button>
    )
}