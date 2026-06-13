import {useEffect, useRef, useState} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {findEvents, findFeed} from "../../api/event.ts";
import type {EventFilters, EventType} from "../../types/eventTypes.ts";

export function useEvents() {
    const observerRef = useRef<HTMLDivElement>(null);
    const [filters, setFilters] = useState<EventFilters>({
        title: '',
        host: '',
        sport: ''
    });

    const hasAnyFilter = filters.title || filters.host || filters.sport;

    const refetchData = (newEventFilters: EventFilters)=> {
        setFilters(newEventFilters)
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
    } = useInfiniteQuery({
        queryKey: hasAnyFilter
            ? ["events", filters.host, filters.title, filters.sport]
            : ["events", "feed"],
        queryFn: async ({pageParam}) => {
            if (hasAnyFilter) {
                return findEvents(pageParam, filters);
            }
            return findFeed(pageParam);
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.length < (hasAnyFilter ? 10 : 15)) return undefined;
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

    return {events, observerRef, error: isError, isFetchingNextPage, refetchData, filters};
}
