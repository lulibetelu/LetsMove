import CalendarView from "../components/calendar/CalendarView";
import {useProfileEvents} from "../hooks/events/useProfileEvents.ts";
import {getCurrentUserId} from "../api/user.ts";
import {handleApiError} from "../api/client.ts";
import Sidebar from "../components/Sidebar.tsx";
import {Calendar} from "lucide-react";

export default function CalendarPage() {
    const currentUserId: number|null = getCurrentUserId();
    if (!currentUserId) handleApiError("couldn't find user current user")

    const { events: eventList = [], isLoading } = useProfileEvents(currentUserId);

    if (isLoading) return <span className="loading loading-spinner" />;

    return (
        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar/>
            <main className="flex-1 ml-60">
                <div className="w-full max-w-5xl mx-auto min-h-screen pb-24">
                    <header className="sticky top-0 z-40 bg-[#141414]/90 backdrop-blur-md px-6 py-5 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <Calendar size={22} className="text-[#8A9A5B]" />
                            <h1 className="text-xl font-bold text-white/90">Calendar</h1>
                        </div>
                    </header>
                    <CalendarView events={eventList} />
                </div>
            </main>
        </div>
    );
}