import { useState } from "react";
import type { EventType } from "../../types/eventTypes.ts";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

interface CalendarViewProps {
    events: EventType[];
}

export default function CalendarView({ events }: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const goToPreviousMonth = () =>
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));

    const goToNextMonth = () =>
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

    return (
        <div className="p-6">
            <CalendarHeader
                currentDate={currentDate}
                onPrevious={goToPreviousMonth}
                onNext={goToNextMonth}
            />
            <CalendarGrid currentDate={currentDate} events={events} />
        </div>
    );
}