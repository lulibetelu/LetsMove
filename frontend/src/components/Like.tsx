import {ThumbsUp} from "lucide-react";
import {create} from "../api/like.ts";
import {useState} from "react";
export default function Like({postId, initialIsLiked} : {postId: number, initialIsLiked: boolean}){
    const [isLiked, setLike] = useState(initialIsLiked);
    return(
        <button type="button" className="cursor-pointer" onClick={() => {
            create(postId);
            setLike(true);
        }}>
            {isLiked? <ThumbsUp fill="#605dff" color="#605dff" /> : <ThumbsUp />}
        </button>
    )
}