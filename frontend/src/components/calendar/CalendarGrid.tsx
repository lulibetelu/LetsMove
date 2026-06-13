import { useMemo } from "react";
import type { EventType } from "../../types/eventTypes.ts";
import CalendarCell from "./CalendarCell";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarGridProps {
    currentDate: Date;
    events: EventType[];
}

export default function CalendarGrid({ currentDate, events }: CalendarGridProps) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();

    // Build the flat array of cells: null for padding, number for actual days
    const cells = useMemo<(number | null)[]>(() => {
        const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const result: (number | null)[] = [
            ...Array<null>(firstDayOfWeek).fill(null),
            ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
        ];

        // Pad the last row to complete 7 columns
        const remainder = result.length % 7;
        if (remainder !== 0) result.push(...Array<null>(7 - remainder).fill(null));

        return result;
    }, [year, month]);

    const getEventsForDay = (day: number): EventType[] =>
        events.filter((event) => {
            const date = new Date(event.startingDate);
            return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
        });

    const isToday = (day: number): boolean =>
        day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    return (
        <div>
            <div className="grid grid-cols-7 mb-1">
                {DAYS_OF_WEEK.map((d) => (
                    <div key={d} className="py-2 text-center text-xs font-medium text-white/30">
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {cells.map((day, index) => (
                    <CalendarCell
                        key={index}
                        day={day}
                        isToday={day !== null && isToday(day)}
                        events={day !== null ? getEventsForDay(day) : []}
                    />
                ))}
            </div>
        </div>
    );
}