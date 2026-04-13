import {ThumbsDown} from "lucide-react";
import {useState} from "react";
import {createDislike, removeDislike} from "../api/dislike.ts";
import type {ActionValidatorResponse} from "../types/actionValidatorResponse.ts";

interface Props{
    postId: number,
    initialIsDisliked: boolean
}

export default function Dislike(props: Props){
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
            className={`flex cursor-pointer items-center gap-1 transition-colors hover:text-primary ${isDisliked ? 'text-primary' : 'text-base-content/70'}`}
            aria-label={isDisliked ? "Quitar no me gusta" : "No me gusta"} onClick={handleClick}>
            <ThumbsDown
                size={20}
                strokeWidth={1.5}
                fill={isDisliked ? "currentColor" : "none"} />
        </button>
    )
}