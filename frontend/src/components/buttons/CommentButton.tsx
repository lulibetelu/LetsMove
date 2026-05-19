import {CircleUserRound, Trash} from "lucide-react";

interface Props {
    id: number,
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
        <>
            <div className="flex justify-between items-start py-3 px-1">

                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <CircleUserRound size={18} strokeWidth={1.5} className="text-white/40"/>
                    <span className="text-sm font-semibold text-[#8A9A5B]">{props.user}</span>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                        {props.content}
                    </p>
                </div>
                { showEliminate ? <button onClick={() => props.handleClick(props.id)} className="text-white/30 hover:text-red-400 transition-colors ml-4 mt-0.5">
                    <Trash size={16} strokeWidth={1.5}/>
                </button> : <></> }
            </div>
            <hr className="border-white/5" />
        </>
    )
}