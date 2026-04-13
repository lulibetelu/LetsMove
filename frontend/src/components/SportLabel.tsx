import {useState} from "react";

interface Props{
    sportName: string
    onChange?: (sport: string, level: string) => void;
}

export default function SportLabel(props: Props){
    const buttonStyle:string[] = ["btn btn-outline", "btn btn-outline bg-green-500","btn btn-outline bg-green-600", "btn btn-outline bg-green-800" ];
    const buttonContent: string[] = ["", "Principiante", "Intermedio", "Experto"]
    const [styleIndex, setStyleIndex] = useState(0);
    const handleClick = () => {
        const next = styleIndex === 3 ? 0 : styleIndex + 1;
        setStyleIndex(next);
        props.onChange?.(props.sportName, buttonContent[next])
    }

    return (
        <button className={buttonStyle[styleIndex]} onClick={handleClick}>
            <p>{props.sportName}</p>
            <p>{buttonContent[styleIndex]}</p>
        </button>

    )
}