import {ThumbsDown} from "lucide-react";
import {useState} from "react";
import {createDislike, removeDislike} from "../../api/dislike.ts";
import type {ActionValidatorResponse} from "../../types/actionValidatorResponse.ts";

interface Props{
    postId: number,
    initialIsDisliked: boolean
}

export default function DislikeButton(props: Props){
    const [isDisliked, setDislike] = useState(props.initialIsDisliked);

    const handleClick = async () => {
        let actionValidatorResponse: ActionValidatorResponse;
        if (!isDisliked) {
            actionValidatorResponse = await createDislike(props.postId);
        }
        else {
            actionValidatorResponse = await removeDislike(props.postId);
        }
        if (!actionValidatorResponse.error) setDislike(!isDisliked);
    }
    return (
        <button
            type="button"
            className={`group flex cursor-pointer items-center gap-1 transition-all duration-300 rounded-full p-0.5 ${isDisliked ? 'text-[#8A9A5B]'
                : 'text-white/70 hover:text-[#8A9A5B]'}`}
            aria-label={isDisliked ? "Quitar no me gusta" : "No me gusta"} onClick={handleClick}>
            <ThumbsDown
                size={16}
                strokeWidth={isDisliked ? 2 : 1.5}
                fill={isDisliked ? "#8A9A5B" : "none"}
                className="transition-transform active:scale-125"
            />
        </button>
    )
}