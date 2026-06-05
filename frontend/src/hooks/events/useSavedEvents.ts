import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saveEvent, unsaveEvent, findSavedEvents } from "../../api/savedEvent.ts";
import { useCallback, useMemo } from "react";

export function useSavedEvents() {
    const queryClient = useQueryClient();

    const { data: savedEntries = [] } = useQuery({
        queryKey: ['savedEvents'],
        queryFn: findSavedEvents,
    });

    const saved = useMemo(() => new Set(savedEntries.map((e) => e.eventId)), [savedEntries]);

    const { mutateAsync: toggleSave } = useMutation({
        mutationFn: async (eventId: number) => {
            if (saved.has(eventId)) {
                await unsaveEvent(eventId);
            } else {
                await saveEvent(eventId);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['savedEvents'] });
        },
    });

    const isSaved = useCallback((eventId: number) => saved.has(eventId), [saved]);

    return { saved, toggleSave, isSaved };
}
