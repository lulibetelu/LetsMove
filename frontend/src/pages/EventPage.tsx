import {useParams} from "react-router-dom";
import InPersonEventPage from "../components/events/InPersonEventPage.tsx";
import AsyncEventPage from "../components/events/AsyncEventPage.tsx";
import PopUpError from "../components/PopUpError.tsx";
import useOneEvent from "../hooks/events/useOneEvent.ts";
import Sidebar from "../components/Sidebar.tsx";
export default function EventPage() {
    const { id } = useParams();
    const numericId = Number(id);

    const { data: event, isLoading, isError: error } = useOneEvent(numericId);

    if (isLoading) return (
        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar/>
            <main className="flex-1 ml-60 flex justify-center items-start pt-20">
                <span className="text-[#8A9A5B] font-semibold">Loading...</span>
            </main>
        </div>
    );
    if (error) return <PopUpError message="cannot load events"/>
    if (!event) return <PopUpError message="Event not found"/>
    switch (event.eventType) {
        case "InPerson": return <InPersonEventPage event={event}/>;
        case "Asynchronous": return <AsyncEventPage event={event}/>
        default: return <PopUpError message="Unknown event type"/>
    }
}