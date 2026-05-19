import {useQuery} from "@tanstack/react-query";
import {findOneEvent} from "../api/event.ts";

export default function useEvent(eventId: number) {
    return useQuery({
        queryKey: ['event', eventId],
        queryFn: () => findOneEvent(eventId),
    });
}