import {useParams} from "react-router-dom";
import InPersonEventPage from "../components/events/InPersonEventPage.tsx";
import AsyncEventPage from "../components/events/AsyncEventPage.tsx";
import PopUpError from "../components/PopUpError.tsx";
import useOneEvent from "../hooks/events/useOneEvent.ts";
export default function EventPage() {
    const { id } = useParams();
    const numericId = Number(id);

    const { data: event, isError: error } = useOneEvent(numericId);

    if (error) return <PopUpError message="cannot load events"/>
    switch (event?.eventType) {
        case "InPerson": return <InPersonEventPage event={event}/>;
        case "Asynchronous": return <AsyncEventPage event={event}/>
    }
}