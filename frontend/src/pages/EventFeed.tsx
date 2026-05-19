import Sidebar from "../components/Sidebar.tsx";
import {Search} from "lucide-react";
import {useState} from "react";
import Events from "../components/events/Events.tsx";
import PopUpError from "../components/PopUpError.tsx";
import NewEvent from "../components/create/NewEvent.tsx";
import {useEvents} from "../hooks/useEvents.ts";

export default function EventFeed(){
    const {events, observerRef, error, isFetchingNextPage} = useEvents();

    //lo que usas para indicar qué div es el que usas para pedir los proximos eventos.
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);


    return (

        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar/>
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

                    {isFetchingNextPage && (
                        <div className="h-20 w-full flex items-center justify-center">
                            <span className="loading loading-spinner loading-md text-[#8A9A5B]"/>
                        </div>
                    )}

                    <div ref={observerRef}/>
                </div>
            </main>
            <div className="flex justify-end items-end h-screen">
                <button type="button"
                        onClick={() => setShowCreateEventForm(true)}
                        className="
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
                {showCreateEventForm && <NewEvent onClose={() => setShowCreateEventForm(false)} />}
                </div>
        </div>
    )
}