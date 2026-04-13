import {ThumbsUp} from "lucide-react";
import {createLike, removeLike} from "../api/like.ts";
import {useState} from "react";
import type {ActionValidatorResponse} from "../types/actionValidatorResponse.ts";

export default function Like({postId, initialIsLiked} : {postId: number, initialIsLiked: boolean}){
    const [isLiked, setLike] = useState(initialIsLiked);
    return(
        <button
            type="button"
            className={`flex cursor-pointer items-center gap-1 transition-colors hover:text-primary ${isLiked ? 'text-primary' : 'text-base-content/70'}`}
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
                strokeWidth={1.5}
                fill={isLiked ? "currentColor" : "none"}
            />
        </button>
    )
}