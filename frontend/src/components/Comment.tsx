import {CircleUserRound, Trash} from "lucide-react";
import {useUsername} from "../hooks/UseUsername.tsx";

interface Props {
    id: number,
    user: string,
    content: string,
    handleClick: (id:number) => void,
}

export default function Comment(props: Props){
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
            <div className="flex justify-between">

                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2">
                    <CircleUserRound size={20} strokeWidth={1.5} />
                    <span className="font-semibold text-sm">{props.user}</span>
                    </div>
                    <p className="text-base-content/80">
                        {props.content}
                    </p>
                </div>
                { showEliminate ? <button onClick={() => props.handleClick(props.id)}>
                    <Trash className="hover:bg-red-800"/>
                </button> : <></> }
            </div>
            <hr className="border-base-300" />
        </>
    )
}