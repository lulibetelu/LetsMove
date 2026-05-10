import type {EventType} from "../types/eventTypes.ts";
import Event from "./Event.tsx";

interface Props {
    eventArray: EventType[],
}

export default function Events({eventArray}: Props){
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {eventArray.map((event: EventType) => (
                <Event key={event.id} event={event} />
            ))}
        </div>
    );
}