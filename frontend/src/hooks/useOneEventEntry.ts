import {useQuery} from "@tanstack/react-query";
import {findOneSignUp} from "../api/event.ts";
import {getCurrentUserId} from "../api/user.ts";

export default function useOneEventEntry(eventId: number) {
    const userId = getCurrentUserId();
    return useQuery({
        queryKey: ['oneEventSignUp', eventId, userId],
        queryFn: () => findOneSignUp(eventId),
    });
}