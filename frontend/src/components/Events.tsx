import type {EventType} from "../types/eventTypes.ts";
import Event from "./Event.tsx";
import {Link} from "react-router-dom";
import {getCurrentUserId} from "../api/user.ts";
import PopUpError from "./PopUpError.tsx";

interface Props {
    eventArray: EventType[],
}

export default function Events({eventArray}: Props){
    const userId = getCurrentUserId();
    if (!userId) return <PopUpError message="User unlogged"/>;
    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {eventArray
            .filter((event) => event.hostId !== userId)
            .map((event: EventType) => {
            return (<Link key={event.id} to={`/event/${event.id}`}>
                <Event event={event} />
                </Link>
            )
            })}
        </div>
    )
}