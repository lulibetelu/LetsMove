import {Link} from "react-router-dom";

interface Props {
    username: string;
    userId: number;
    color?: string;
    textSize?: string;
}

export default function ProfileLink(props: Props){
    const color: string = props.color? props.color : "#8A9A5B";
    const textSize: string = props.textSize? props.textSize : "sm";

    return (
        <Link
            to={`/profile/${props.userId}`}
            onClick={(e) => e.stopPropagation()}
            className={`text-[${textSize}] font-semibold text-[${color}] hover:text-[#a8bb72] transition-colors`}
        >
            {props.username}
        </Link>
    )
}