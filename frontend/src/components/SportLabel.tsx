import {useState} from "react";

interface Props{
    sportName: string
}

export default function SportLabel(props: Props){
    const buttonStyle:string[] = ["btn btn-outline", "btn btn-outline bg-green-500","btn btn-outline bg-green-600", "btn btn-outline bg-green-800" ];
    const buttonContent: string[] = ["", "Principiante", "Intermedio", "Experto"]
    const [styleIndex, setStyleIndex] = useState(0);
    const handleClick = () => {
        if (styleIndex === 3) setStyleIndex(0);
        else setStyleIndex(styleIndex + 1);

    }

    return (
        <button className={buttonStyle[styleIndex]} onClick={handleClick}>
            <p>{props.sportName}</p>
            <p>{buttonContent[styleIndex]}</p>
        </button>

    )
}