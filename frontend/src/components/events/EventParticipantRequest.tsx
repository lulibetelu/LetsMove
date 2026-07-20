import {Check, X, CircleUserRound} from "lucide-react";
import type {PendingParticipant} from "../../types/eventTypes.ts";

type Props = {
    participant: PendingParticipant;
    onChange: (isAccepted: boolean, userId: number, eventId: number) => void;
};

export default function EventParticipantRequest({participant, onChange}: Props) {
    return (
        <div className="w-full border-b border-white/5 hover:bg-white/[0.02] transition-colors px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <CircleUserRound size={20} strokeWidth={1.5} className="text-white/40"/>
                <div>
                    <span className="text-sm font-semibold text-[#8A9A5B]">{participant.user.username}</span>
                    <span className="text-sm text-white/60"> wants to join </span>
                    <span className="text-sm font-semibold text-white/80">{participant.eventTitle}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="p-2 rounded-full hover:bg-[#8A9A5B]/15 transition-colors"
                    onClick={() => onChange(true, participant.userId, participant.eventId)}
                    aria-label="Accept"
                >
                    <Check size={18} strokeWidth={1.8} className="text-[#8A9A5B]"/>
                </button>
                <button
                    type="button"
                    className="p-2 rounded-full hover:bg-red-400/10 transition-colors"
                    onClick={() => onChange(false, participant.userId, participant.eventId)}
                    aria-label="Reject"
                >
                    <X size={18} strokeWidth={1.8} className="text-red-400/70"/>
                </button>
            </div>
        </div>
    );
}