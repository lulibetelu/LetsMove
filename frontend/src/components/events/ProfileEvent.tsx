import type {EventType} from "../../types/eventTypes.ts";
import {formatDate} from "../../resusable-functions/formatDate.ts";

interface Props{
    event: EventType
}

export default function ProfileEvent({event}:Props){
    return (
        <div className="space-y-3">
            {/* Tarjeta de Evento */}
            <div className="bg-[#141414] p-3 rounded-lg border border-white/5 border-l-2 border-l-[#8A9A5B] hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                <h4 className="font-semibold text-sm text-white/80">{event.title}</h4>
                <p className="text-xs text-white/40 mt-1">{formatDate(event.startingDate)}</p>
                <p className="text-xs text-white/40">{event.location ? event.location.location : ""}</p>
                <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider text-[#8A9A5B] bg-[#8A9A5B]/10 px-2 py-0.5 rounded-full">
                                          {event.eventType}
                                        </span>
            </div>
        </div>
    )
}