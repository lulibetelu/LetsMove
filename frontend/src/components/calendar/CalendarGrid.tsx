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

    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Build the flat array of cells: null for padding, number for actual days
    const cells = useMemo<(number | null)[]>(() => {
        const result: (number | null)[] = [
            ...Array<null>(firstDayOfWeek).fill(null),
            ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
        ];

        // Pad the last row to complete 7 columns
        const remainder = result.length % 7;
        if (remainder !== 0) result.push(...Array<null>(7 - remainder).fill(null));

        return result;
    }, [firstDayOfWeek, daysInMonth]);

    const getEventsForDay = (day: number): EventType[] =>
        events.filter((event) => {
            const start = new Date(event.startingDate);
            if (event.endingDate) {
                const end = new Date(event.endingDate);
                const current = new Date(year, month, day);
                current.setHours(0, 0, 0, 0);
                start.setHours(0, 0, 0, 0);
                end.setHours(0, 0, 0, 0);
                return current >= start && current <= end;
            }
            return start.getFullYear() === year && start.getMonth() === month && start.getDate() === day;
        });

    const isToday = (day: number): boolean =>
        day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    const getContinuation = (day: number): Map<number, { prev: boolean; next: boolean }> => {
        const map = new Map<number, { prev: boolean; next: boolean }>();
        const current = new Date(year, month, day);
        current.setHours(0, 0, 0, 0);
        const prevDay = new Date(current);
        prevDay.setDate(prevDay.getDate() - 1);
        const nextDay = new Date(current);
        nextDay.setDate(nextDay.getDate() + 1);

        events.forEach((event) => {
            if (!event.endingDate) return;
            const start = new Date(event.startingDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(event.endingDate);
            end.setHours(0, 0, 0, 0);
            map.set(event.id, {
                prev: start <= prevDay && prevDay <= end,
                next: start <= nextDay && nextDay <= end,
            });
        });
        return map;
    };

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
                        continuation={day !== null ? getContinuation(day) : new Map()}
                    />
                ))}
            </div>
        </div>
    );
}