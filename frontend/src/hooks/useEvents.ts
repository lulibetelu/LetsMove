import { useEffect, useRef } from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {findEvents} from "../api/event.ts";
import type { EventType } from "../types/eventTypes.ts";
import {getCurrentUserId} from "../api/user.ts";

export function useEvents() {
    const observerRef = useRef<HTMLDivElement>(null);
    const currentUserId = getCurrentUserId();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
    } = useInfiniteQuery({
        queryKey: ["events"],
        queryFn: async ({ pageParam }) => {
            const events = await findEvents(pageParam)
            return events;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.length < 10) return undefined;
            return allPages.length + 1;
        },
        initialPageParam: 1,
    });

    // const events: EventType[] = data?.pages.flat().filter((event: EventType) => event.hostId !== currentUserId) ?? [];
    let events: EventType[]  = [];
    events = data?.pages.flat().filter((event: EventType) => event.hostId !== currentUserId) ?? [];

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


    return { events, observerRef, error: isError, isFetchingNextPage };
}