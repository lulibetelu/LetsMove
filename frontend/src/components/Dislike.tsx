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
        <button type="button" className="cursor-pointer" onClick={handleClick}>
            {isDisliked? <ThumbsDown fill="#605dff" color="#605dff" /> : <ThumbsDown/>}
        </button>
    )
}