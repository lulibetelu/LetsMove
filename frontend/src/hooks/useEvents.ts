import {useCallback, useEffect, useRef, useState} from "react";
import {findEvents} from "../api/event.ts";
import type {EventType} from "../types/eventTypes.ts";

export function useEvents(){
    const [events, setEvents] = useState<EventType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>();
    const observerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<boolean>(false);

    function updateState(fetchedEvents: EventType[]){
        if (fetchedEvents.length < 10 || fetchedEvents.length === 0) {
            setHasMore(false);
            return page;
        }

        setHasMore(true);
        return page +1;
    }

    const updateEvents = useCallback( () => {
        findEvents(page)
            .then((p) => {
                setEvents(prev => [...prev, ...p]);
                setPage(updateState(p));
            })
            .catch((_) => setError(true))
    },[page])

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const ancla = entries[0];
            if (ancla.isIntersecting && hasMore) {
                updateEvents();
            }
        };

        const observer = new IntersectionObserver(observerCallback);

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [updateEvents, hasMore]);

    useEffect(() => {
        updateEvents()
    }, []);

    return {events, observerRef, updateEvents, error}
}