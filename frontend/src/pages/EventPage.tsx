import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {findOneEvent} from "../api/event.ts";
import type {EventType} from "../types/eventTypes.ts";
import InPersonEventPage from "./InPersonEventPage.tsx";
import AsyncEventPage from "./AsyncEventPage.tsx";
import PopUpError from "../components/PopUpError.tsx";

export default function EventPage() {
    const { id } = useParams();
    const numericId = Number(id);
    const [event, setEvent] = useState<EventType>();
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchEventData = async () => {
            try {

                const eventResponse: EventType = await findOneEvent(numericId);
                setEvent(eventResponse);
            } catch {
                setError(true);
            }
        }

        fetchEventData();

    }, [numericId]);

    if (error) return <PopUpError message="cannot load events"/>
    switch (event?.eventType) {
        case "InPerson": return <InPersonEventPage event={event}/>;
        case "Asynchronous": return <AsyncEventPage event={event}/>
    }
}