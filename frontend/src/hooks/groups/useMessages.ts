import {useQuery, useQueryClient} from "@tanstack/react-query";
import {findAllMessages} from "../../api/message.ts";
import type { Message } from "../../types/messageType.ts";
import {useCallback} from "react";
export function useMessages(groupId: number){

    const queryClient = useQueryClient()
    // historial inicial desde la API REST
    const { data: messages = [] } = useQuery<Message[]>({
        queryKey: ['messages', groupId],
        queryFn: () => findAllMessages(groupId),
        staleTime: Infinity,

    });

    const handleUpdate =useCallback( (message: Message) =>
        queryClient.setQueryData<Message[]>(['messages', groupId], (oldData) => oldData === undefined ? [message] : [...oldData, message]),
        [groupId, queryClient])


    return { messages, handleUpdate }

}