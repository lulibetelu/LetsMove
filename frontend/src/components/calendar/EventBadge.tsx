import type { EventType } from "../../types/eventTypes.ts";
import {Link} from "react-router-dom";
import {CalendarDays} from "lucide-react";

interface EventBadgeProps {
    event: EventType;
    hasPrev?: boolean;
    hasNext?: boolean;
}

export default function EventBadge({ event, hasPrev, hasNext }: EventBadgeProps) {
    const isInPerson = event.eventType === "InPerson";
    const isMultiDay = !!event.endingDate;
    const barColor = isInPerson ? "bg-[#8A9A5B]/40" : "bg-blue-400/40";

    return (
        <Link to={`/event/${event.id}`}>
        <div
            title={event.title}
            className={`text-xs px-1.5 py-0.5 rounded truncate cursor-pointer transition-opacity hover:opacity-80 ${
                isInPerson
                    ? "bg-[#8A9A5B]/20 text-[#8A9A5B]"
                    : "bg-blue-500/20 text-blue-400"
            }`}
        >
            <span className="flex items-center gap-1">
                {hasPrev && <span className={`h-[2px] w-1 ${barColor}`} />}
                {isMultiDay && <CalendarDays size={10} className="shrink-0" />}
                <span className="truncate">{event.title}</span>
                {hasNext && <span className={`h-[2px] w-1 ${barColor}`} />}
            </span>
        </div>
        </Link>
    );
}