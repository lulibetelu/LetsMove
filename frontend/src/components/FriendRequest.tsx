import {Check, X, CircleUserRound} from "lucide-react";

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
        <div className="w-full border-b border-white/5 hover:bg-white/[0.02] transition-colors px-6 py-4 flex items-center justify-between">

            {/* User Info */}
            <div className="flex items-center gap-3">
                <CircleUserRound size={20} strokeWidth={1.5} className="text-white/40" />
                <span className="text-sm font-semibold text-[#8A9A5B]">{props.username}</span>

                <p className="text-sm text-white/60">Wants to be your friend!</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="p-2 rounded-full hover:bg-[#8A9A5B]/15 transition-colors"
                    onClick={handleAcceptClick}
                    aria-label="Aceptar"
                >
                    <Check size={18} strokeWidth={1.8} className="text-[#8A9A5B]" />
                </button>
                <button
                    type="button"
                    className="btn bg-white/5 hover:bg-error/20 text-white/70 hover:text-white btn-circle border-none"
                    onClick={handleRejectClick}
                    aria-label="Rechazar"
                >
                    <X size={18} strokeWidth={1.8} className="text-red-400/70" />
                </button>
            </div>
        </div>
    );
}