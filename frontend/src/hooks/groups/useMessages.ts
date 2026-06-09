import {useQuery} from "@tanstack/react-query";
import {findAllMessages} from "../../api/message.ts";
import type { Message } from "../../types/messageType.ts";

export function useMessages(groupId: number){


    const {data, isError,isPending} = useQuery<Message[]>({
        queryKey: ['messages'],
        queryFn: () => findAllMessages(groupId)
    })

    return {data, isError, isPending}
}