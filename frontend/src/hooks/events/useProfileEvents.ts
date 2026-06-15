import {useInfiniteQuery} from "@tanstack/react-query";
import {findEventsUserParticipate} from "../../api/event.ts";
import type {EventType} from "../../types/eventTypes.ts";
import {useEffect, useRef} from "react";

export function useProfileEvents(profileUserId: number){
    const observerRef = useRef<HTMLDivElement>(null);


    const {
        data,
        fetchNextPage,
        hasNextPage,
        isError,
        isLoading,
    }= useInfiniteQuery({
        queryKey: ['profileEvents', profileUserId],
        queryFn: (async ({pageParam}) => {
            const events: EventType[] = await findEventsUserParticipate(pageParam, profileUserId);
            return events;
        }),
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.length < 10) return undefined;
            return allPages.length + 1;
        },
        initialPageParam: 1,
    });

    const events: EventType[] = data?.pages.flat() ?? [];

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

    const error: boolean = isError

    return { events, observerRef, error, isLoading}
}