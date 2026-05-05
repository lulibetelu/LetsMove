import Sidebar from "../components/Sidebar.tsx";
import {Search} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import type {EventType} from "../types/eventTypes.ts"
import {findEvents} from "../api/event.ts";
import Events from "../components/Events.tsx";

export default function EventPage(){
    const [events, setEvents] = useState<EventType[]>([]);
    const [cursor, setCursor] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(false);
    //lo que usas para indicar qué div es el que usas para pedir los proximos eventos.
    const loaderRef = useRef<HTMLDivElement>(null);

    const fetchEvents = async () => {
        try {
            const events: EventType[] = await findEvents(cursor)
            if (events.length !== 0){
                setEvents(prev => [...prev, ...events])
                setCursor(prev => prev+1);
                setHasMore(true);
            }else {
                setHasMore(false);
            }
        }catch {
            setError(true);
        }

    }

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) fetchEvents();
        });
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    },[cursor, hasMore]);

    return (
        <div className="min-h-screen bg-base-100 flex">
            <Sidebar onPostCreated={() => null}/>
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
                    <div ref={loaderRef}></div>
                </div>
            </main>
        </div>
    )
}