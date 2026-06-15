import type {EventType} from "../../types/eventTypes.ts";
import Event from "./Event.tsx";
import {getCurrentUserId} from "../../api/user.ts";
import PopUpError from "../PopUpError.tsx";

interface Props {
    eventArray: EventType[],
}

export default function Events({eventArray}: Props){
    const userId = getCurrentUserId();
    if (!userId) return <PopUpError message="User unlogged"/>;
    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {eventArray
            .map((event: EventType) => {
            return (<Event key={event.id} event={event} />)
            })}
        </div>
    )
}