import {ThumbsDown} from "lucide-react";
import {useState} from "react";

interface Props{
    postId: number,
    initialIsDisliked: boolean
}

export default function Dislike(props: Props){
    const [isDisliked, setDislike] = useState(props.initialIsDisliked);

    const handleClick = () => {
        // if (!isDisliked) createDislike();
        // else removeDislike();
        setDislike(!isDisliked);
    }
    return (
        <button type="button" className="cursor-pointer" onClick={handleClick}>
            {isDisliked? <ThumbsDown fill="#605dff" color="#605dff" /> : <ThumbsDown/>}
        </button>
    )
}