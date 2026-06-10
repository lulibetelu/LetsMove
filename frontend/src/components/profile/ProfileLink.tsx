import {Link} from "react-router-dom";

interface Props {
    username: string;
    userId: number;
}

export default function ProfileLink(props: Props){
    return (
        <Link
            to={`/profile/${props.userId}`}
            onClick={(e) => e.stopPropagation()}
            className="text-sm font-semibold text-[#8A9A5B] hover:text-[#a8bb72] transition-colors"
        >
            {props.username}
        </Link>
    )
}