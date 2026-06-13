import type { EventType } from "../../types/eventTypes.ts";
import {Link} from "react-router-dom";

interface EventBadgeProps {
    event: EventType;
}

export default function EventBadge({ event }: EventBadgeProps) {
    const isInPerson = event.eventType === "InPerson";

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
            {event.title}
        </div>
        </Link>
    );
}