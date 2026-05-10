import Sidebar from "../components/Sidebar.tsx";
import {Search} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import type {EventType} from "../types/eventTypes.ts"
import {findEvents} from "../api/event.ts";
import Events from "../components/Events.tsx";
import PopUpError from "../components/PopUpError.tsx";

export default function EventFeed(){
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
                if (events.length >= 15) setCursor(prev => prev+1);

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

        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar onPostCreated={() => null}/>
            <main className="flex-1 ml-60">
                <div className="w-full max-w-6xl mx-auto min-h-screen pb-24">
                    <header className="sticky top-0 z-40 bg-[#141414]/90 backdrop-blur-md px-6 py-5 flex justify-center border-b border-white/5">
                        <div className="w-full max-w-md relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search size={18} className="text-white/30" />
                            </div>
                            <input
                                type="text"
                                aria-label="Search events"
                                placeholder="Buscar eventos..."
                                className="w-full rounded-full pl-12 h-10 bg-white/5 border border-white/10 text-white/80 placeholder:text-white/30 text-sm focus:outline-none focus:border-[#8A9A5B]/50 transition-colors"
                            />
                        </div>
                    </header>

                    <Events eventArray={events}/>

                    {error && <PopUpError message="Failed to load events, please try again later"/>}

                    {/*{hasMore && (*/}
                    {/*    <div ref={loaderRef} className="h-20 w-full flex items-center justify-center">*/}
                    {/*        <span className="loading loading-spinner loading-md text-[#8A9A5B]"/>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    {/*{!hasMore && <div ref={loaderRef}/>}*/}

                    <div ref={loaderRef}/>
                </div>
            </main>
        </div>
    )
}