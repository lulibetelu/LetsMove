import {CircleUserRound, Trash} from "lucide-react";
import {Link} from "react-router-dom";

interface Props {
    id: number,
    authorId: number,
    user: string,
    content: string,
    handleClick: (id:number) => void,
}

export default function CommentButton(props: Props){
    const getUsername= () => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));

        return decoded.username.trim();
    };
    const showEliminate: boolean = getUsername() === props.user;

    return (
        <div className="px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-3 mb-1">
                <CircleUserRound size={20} strokeWidth={1.5} className="text-white/40 shrink-0" />
                <Link
                    to={`/profile/${props.authorId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm font-semibold text-[#8A9A5B] hover:text-[#a8bb72] transition-colors"
                >
                    {props.user}
                </Link>
                {showEliminate && (
                    <button onClick={() => props.handleClick(props.id)} className="ml-auto text-white/30 hover:text-red-400 transition-colors shrink-0">
                        <Trash size={16} strokeWidth={1.5}/>
                    </button>
                )}
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
                {props.content}
            </p>
        </div>
    )
}