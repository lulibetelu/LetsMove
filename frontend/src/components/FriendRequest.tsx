import {Check, X, LucideMail} from "lucide-react";

type FriendRequestProps = {
    senderId: number;
    username: string;
    onChange: (isAccepted: boolean, senderId: number) => void
};

export default function FriendRequest(props: FriendRequestProps) {
    const handleAcceptClick = () => {
        props.onChange(true, props.senderId);
    };
    const handleRejectClick = () => {
        props.onChange(false, props.senderId);

    };


    return (
        <div className="w-full border-b-2 border-base-content/10 hover:bg-base-200/30 transition-colors px-4 py-4 flex items-center justify-between">

            {/* User Info */}
            <div className="flex items-center gap-4">
                <LucideMail size={26} strokeWidth={1.5}/>
                <span className="font-bold text-[#6B8E23]">{props.username}</span>
                <p>wants to be your friend!</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <button className="btn btn-ghost btn-circle hover:bg-success/20" onClick={handleAcceptClick}>
                    <Check size={20} className="text-success"/>
                </button>
                <button className="btn btn-ghost btn-circle hover:bg-error/20" onClick={handleRejectClick}>
                    <X size={20} className="text-error"/>
                </button>
            </div>
        </div>
    );
}