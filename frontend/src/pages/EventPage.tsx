import Sidebar from "../components/Sidebar.tsx";
import {Search} from "lucide-react";
import Event from "../components/Event.tsx";
import {useEffect, useState} from "react";
import type {EventType} from "../types/eventTypes.ts"

export default function EventPage(){
    /*const [events, setEvents] = useState<EventType[]>([]);

    const loadEvents = useEffect(() =>{



    },[])*/

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
                    <Event id={1} title="Football match" description="This is a football match"/>
                </div>
            </main>
        </div>
    )
}