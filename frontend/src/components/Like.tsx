import {ThumbsUp} from "lucide-react";
import {create, remove} from "../api/like.ts";
import {useState} from "react";
export default function Like({postId, initialIsLiked} : {postId: number, initialIsLiked: boolean}){
    const [isLiked, setLike] = useState(initialIsLiked);
    return(
        <button type="button" className="cursor-pointer" onClick={() => {
            if (!isLiked) create(postId);
            else remove(postId);
            setLike(!isLiked);
        }}>
            {isLiked? <ThumbsUp fill="#605dff" color="#605dff" /> : <ThumbsUp />}
        </button>
    )
}