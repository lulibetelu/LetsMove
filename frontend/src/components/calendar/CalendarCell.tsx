import type{ EventType } from "../../types/eventTypes.ts";
import EventBadge from "./EventBadge";

interface CalendarCellProps {
    day: number | null;
    isToday: boolean;
    events: EventType[];
}

export default function CalendarCell({ day, isToday, events }: CalendarCellProps) {
    if (day === null) {
        return <div className="min-h-24 border border-white/5 bg-[#0e0e0e]" />;
    }

    return (
        <div className={`min-h-24 border border-white/5 p-1.5 ${isToday ? "bg-[#8A9A5B]/10" : ""}`}>
      <span
          className={`mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
              isToday ? "bg-[#8A9A5B] text-white" : "text-white/50"
          }`}
      >
        {day}
      </span>

            <div className="flex flex-col gap-0.5">
                {events.slice(0, 3).map((event) => (
                    <EventBadge key={event.id} event={event} />
                ))}
                {events.length > 3 && (
                    <span className="px-1 text-xs text-white/30">+{events.length - 3} more</span>
                )}
            </div>
        </div>
    );
}