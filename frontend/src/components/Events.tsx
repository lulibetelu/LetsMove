import type {EventType} from "../types/eventTypes.ts";
import Event from "./Event.tsx";

interface Props {
    eventArray: EventType[],
}

export default function Events(props: Props){
    return (<div className="flex flex-col gap-7">
        {props.eventArray.map((event: EventType) => {
            return <Event key={event.id} event={event} />
            })}
        </div>
    )
}