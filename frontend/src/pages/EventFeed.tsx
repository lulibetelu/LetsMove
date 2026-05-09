import Sidebar from "../components/Sidebar.tsx";
import {Search} from "lucide-react";
import {useCallback, useEffect, useRef, useState} from "react";
import type {EventType} from "../types/eventTypes.ts"
import {findEvents} from "../api/event.ts";
import Events from "../components/Events.tsx";
import PopUpError from "../components/PopUpError.tsx";
import NewEvent from "../components/NewEvent.tsx";

export default function EventFeed(){
    const [events, setEvents] = useState<EventType[]>([]);
    const [cursor, setCursor] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(false);
    //lo que usas para indicar qué div es el que usas para pedir los proximos eventos.
    const loaderRef = useRef<HTMLDivElement>(null);
    const [createEvent, setCreateEvent] = useState(false);
    const isFetching = useRef(false);
    const [reloadCount, setReloadCount] = useState(0);

    const fetchEvents = useCallback(async () => {
        if (isFetching.current) return;
        isFetching.current = true;
        try {
            const events: EventType[] = await findEvents(cursor)
            if (events.length > 0) setEvents(prev => [...prev, ...events]);
            setHasMore(events.length >= 15);
            if (events.length >= 15) setCursor(prev => prev + 1);
        }catch {
            setError(true);
        }finally {
            isFetching.current = false;
        }

    },[cursor, reloadCount]);

    const resetFeed = useCallback(() => {
        setEvents([]);
        setCursor(1);
        setHasMore(true);
        setReloadCount(c => c+1);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) fetchEvents();
        });
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    },[fetchEvents, hasMore]);

    return (

        <div className="min-h-screen bg-base-100 flex">
            <Sidebar/>
            <main className="flex-1 ml-20 flex justify-center">
                <div className="w-full max-w-2xl min-h-screen relative pb-24">
                    <header className="sticky top-0 z-40 bg-base-100/90 backdrop-blur-md px-4 py-5 flex justify-center border-b-2 border-base-content/10">
                        <div className="w-full max-w-md relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search size={18} className="text-base-content/50" />
                            </div>
                            <input
                                type="text"
                                aria-label="Search posts"
                                placeholder="search"
                                className="input input-bordered w-full rounded-full pl-12 h-10 bg-base-200/50 focus:bg-base-100 transition-colors"
                            />
                        </div>
                    </header>
                    <Events eventArray={events}/>
                    <div>
                        {/*No corresponde a la branch pero esta bueno tenerlo*/}
                        {error && <PopUpError message='Failed to load events, please try again later'/>}
                    </div>
                    <div ref={loaderRef}></div>
                </div>
            </main>
            <div className="flex justify-end items-end h-screen">
                <button type="button"  onClick={() => setCreateEvent(true)} className="
    fixed bottom-6 right-6
    w-16 h-16
    rounded-full

    bg-[#96a55a]
    hover:bg-[#a8b96a]

    text-white
    text-4xl

    flex items-center justify-center

    shadow-lg
    hover:shadow-2xl

    transition-all duration-300 ease-out

    hover:scale-110
    hover:rotate-90

    active:scale-95

    cursor-pointer
  "
                >+</button>
                {createEvent && <NewEvent onClose={() => setCreateEvent(false)} onEventCreated={resetFeed} />}
                </div>
        </div>
    )
}