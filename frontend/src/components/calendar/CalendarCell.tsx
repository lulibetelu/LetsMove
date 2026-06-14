import type{ EventType } from "../../types/eventTypes.ts";
import EventBadge from "./EventBadge";

interface CalendarCellProps {
    day: number | null;
    isToday: boolean;
    events: EventType[];
    continuation: Map<number, { prev: boolean; next: boolean }>;
}

export default function CalendarCell({ day, isToday, events, continuation }: CalendarCellProps) {
    if (day === null) {
        return <div className="min-h-28 border border-white/5 bg-[#0e0e0e]" />;
    }

    return (
        <div
            className={`min-h-28 border border-white/5 p-1.5 transition-colors ${
                isToday ? "bg-[#8A9A5B]/10" : "hover:bg-white/[3%]"
            }`}
        >
      <span
          className={`mb-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
              isToday ? "bg-[#8A9A5B] text-white" : "text-white/50"
          }`}
      >
        {day}
      </span>

            <div className="flex flex-col gap-0.5">
                {events.slice(0, 3).map((event) => {
                    const cont = continuation.get(event.id);
                    return (
                        <EventBadge
                            key={event.id}
                            event={event}
                            hasPrev={cont?.prev ?? false}
                            hasNext={cont?.next ?? false}
                        />
                    );
                })}
                {events.length > 3 && (
                    <span className="px-1 text-xs text-white/30">+{events.length - 3} more</span>
                )}
            </div>
        </div>
    );
}