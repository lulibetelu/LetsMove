import Sidebar from "../components/Sidebar.tsx";
import {Search, Plus} from "lucide-react";
import {useState} from "react";
import Events from "../components/events/Events.tsx";
import PopUpError from "../components/PopUpError.tsx";
import NewEvent from "../components/create/NewEvent.tsx";
import {useEvents} from "../hooks/events/useEvents.ts";
import CustomButton from "../components/CustomButton.tsx";
import Filters from "../components/Filters.tsx";
import type {EventFilters, FormFilters} from "../types/eventTypes.ts";
import {useNavigate} from "react-router-dom";
import {getCurrentUserId} from "../api/user.ts";



export default function EventFeed(){
    const {events, observerRef, error, isFetchingNextPage, refetchData, filters} = useEvents();
    const [showFilters, setShowFilters] = useState(false);
    const [searchTitle, setSearchTitle] = useState<string>("");
    const navigate = useNavigate();
    const currentUserId: number | null= getCurrentUserId();


    //lo que usas para indicar qué div es el que usas para pedir los proximos eventos.
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);

    const handleSubmit = (formFilters: FormFilters) => {
        if (currentUserId == null) return <PopUpError message={"something went wrong"}/>
        const joinedInId = formFilters.joined ?  currentUserId : undefined;
        const savedInId = formFilters.saved ? currentUserId : undefined;

        const eventFilters: EventFilters = {
            title: searchTitle,
            host: formFilters.host,
            sport: formFilters.sport,
            joined: joinedInId,
            saved: savedInId,
        }
        refetchData(eventFilters)
    }

    const handleSearch = (e: React.SubmitEvent) => {
        e.preventDefault();
        handleSubmit({host: "", sport: ""});
    }

    return (

        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar/>
            <main className="flex-1 ml-60">
                <div className="w-full max-w-5xl mx-auto min-h-screen pb-24">
                    <header className="sticky top-0 z-40 bg-[#141414]/90 backdrop-blur-md px-6 py-5 flex justify-center border-b border-white/5">
                        <div className="w-full max-w-md relative flex flex-row">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search size={18} className="text-white/30" />
                            </div>
                            <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                aria-label="Search events"
                                placeholder="Buscar eventos..."
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                className="w-full rounded-full pl-12 h-10 bg-white/5 border border-white/10 text-white/80 placeholder:text-white/30 text-sm focus:outline-none focus:border-[#8A9A5B]/50 transition-colors"
                            />
                            </form>
                            {/*<CustomButton content="Search" handleClick={() => {}}/>*/}
                        </div>

                        <CustomButton content="Filter" handleClick={() => setShowFilters(true)}/>
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
                            w-10 h-10
                            rounded-full

                            bg-[#96a55a]
                            hover:bg-[#a8b96a]

                            text-white

                            flex items-center justify-center

                            shadow-lg
                            hover:shadow-2xl

                            transition-all duration-300 ease-out

                            hover:scale-110
                            hover:rotate-90

                            active:scale-95

                            cursor-pointer
                          "
                ><Plus size={18} /></button>
                {showCreateEventForm && <NewEvent onClose={() => setShowCreateEventForm(false)} onEventCreated={(id) => navigate(`/event/${id}`)} />}
                </div>
            {showFilters && <Filters filters={filters} onClose={() => setShowFilters(false)} onSubmit={(formFilters:FormFilters) =>handleSubmit(formFilters)}/>}
        </div>
    )
}