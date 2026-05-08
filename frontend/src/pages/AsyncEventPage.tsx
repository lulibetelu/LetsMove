import type {EventType} from "../types/eventTypes.ts";

interface Props{
    event: EventType
}

export default function AsyncEventPage(props: Props){
    return <h1>{props.event.title}</h1>
}