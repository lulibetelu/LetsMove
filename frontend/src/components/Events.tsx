import type {EventType} from "../types/eventTypes.ts";
import Event from "./Event.tsx";
import {Link} from "react-router-dom";
import {getCurrentUserId} from "../api/user.ts";
import PopUpError from "./PopUpError.tsx";

interface Props {
    eventArray: EventType[],
}

export default function Events(props: Props){
    const userId = getCurrentUserId();
    if (!userId) return <PopUpError message="User unlogged"/>;
    return (

        <div className="flex flex-col gap-7">
        {props.eventArray
            .filter((event) => event.hostId !== userId)
            .map((event: EventType) => {
            return (<Link key={event.id} to={`/event/${event.id}`}>
                <Event event={event} currentUserIsOwner={false} />
                </Link>
            )
            })}
        </div>
    )
}