import {ThumbsUp} from "lucide-react";
import {createLike, removeLike} from "../api/like.ts";
import {useState} from "react";
import type {ActionValidatorResponse} from "../types/actionValidatorResponse.ts";

export default function Like({postId, initialIsLiked} : {postId: number, initialIsLiked: boolean}){
    const [isLiked, setLike] = useState(initialIsLiked);
    return(
        <button type="button" className="cursor-pointer" onClick={async () => {
            let actionValidatorResponse: ActionValidatorResponse;
            if (!isLiked){
                 actionValidatorResponse = await createLike(postId);

            }else {
                 actionValidatorResponse = await  removeLike(postId);
            }

            if (!actionValidatorResponse.error) setLike(!isLiked);


        }}>
            {isLiked? <ThumbsUp fill="#605dff" color="#605dff" /> : <ThumbsUp />}
        </button>
    )
}