import CalendarView from "../components/calendar/CalendarView";
import {useProfileEvents} from "../hooks/events/useProfileEvents.ts";
import {getCurrentUserId} from "../api/user.ts";
import {handleApiError} from "../api/client.ts";

export default function CalendarPage() {
    const currentUserId: number|null = getCurrentUserId();
    if (!currentUserId) handleApiError("couldn't find user current user")

    const { events: eventList = [], isLoading } = useProfileEvents(currentUserId);

    if (isLoading) return <span className="loading loading-spinner" />;

    return <CalendarView events={eventList} />;
}