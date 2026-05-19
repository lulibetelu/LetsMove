import {useInfiniteQuery} from "@tanstack/react-query";
import {getEntriesFromEvent} from "../../api/event.ts";
import type {EventEntry} from "../../types/eventTypes.ts";
import {useEffect, useRef} from "react";

export function useEventEntries(eventId: number) {
    const observerRef = useRef<HTMLDivElement>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isError,
    } = useInfiniteQuery({
        queryKey: ['eventEntries', eventId],
        queryFn: async ({pageParam}) => {
            const entries: EventEntry[] = await getEntriesFromEvent(eventId, pageParam);
            return entries;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.length < 10) return undefined;
            return allPages.length + 1;
        },
        initialPageParam: 1,
    });

    const entries: EventEntry[] = data?.pages.flat() ?? [];

    useEffect(() => {
        if (!observerRef.current) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
        observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

    return { entries, observerRef, isError };
}