import type { EventType } from "../types/eventTypes.ts";
import Sidebar from "../components/Sidebar.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {eliminateEvent} from "../api/event.ts";
import EditButton from "../components/EditButton.tsx";
import DeleteButton from "../components/DeleteButton.tsx";
import PopUpError from "../components/PopUpError.tsx";
import EditEventForm from "../components/EditEventForm.tsx";

interface Props {
    event: EventType;
}

function formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function formatTime(date: Date | string): string {
    return new Date(date).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function getInitials(username: string): string {
    return username.slice(0, 2).toUpperCase();
}

export default function AsynchronousEventDetail({ event }: Props) {
    const [editEvent, setEditEvent] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleEventDeletion = async () => {
        try {
            await eliminateEvent(event.id);
            navigate("/event");
        }catch {
            setError(true);
        }
    }

    return (


            <div className="card bg-base-200 border border-base-300 max-w-4xl mx-auto shadow-xl overflow-hidden">
                <Sidebar/>
            <div className="h-1 w-full bg-info" />

            <div className="card-body gap-4">

                <div>
                    <div className="badge badge-info badge-outline text-xs font-semibold tracking-widest uppercase mb-2">
                        Asynchronous
                    </div>
                    <h2 className="card-title text-2xl font-bold">{event.title}</h2>
                    <p className="text-base-content/60 text-sm leading-relaxed mt-1">
                        {event.description}
                    </p>
                </div>

                <div className="flex flex-row w-full">
                    <EditButton handleClick={() => setEditEvent(true)}/>
                    <DeleteButton handleClick={handleEventDeletion}/>
                </div>

                <div className="divider my-0" />

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-base-300 rounded-xl p-4">
                        <p className="text-xs font-semibold text-info tracking-widest uppercase mb-1">Available from</p>
                        <p className="text-sm font-medium">{formatDate(event.startingDate)}</p>
                        <p className="text-sm text-info">{formatTime(event.startingDate)}</p>
                    </div>
                    <div className="bg-base-300 rounded-xl p-4">
                        <p className="text-xs font-semibold text-info tracking-widest uppercase mb-1">Available until</p>
                        <p className="text-sm font-medium">
                            {event.endingDate ? formatDate(event.endingDate) : "No deadline"}
                        </p>
                        {event.endingDate && (
                            <p className="text-sm text-info">{formatTime(event.endingDate)}</p>
                        )}
                    </div>
                </div>

                <div className="divider my-0" />

                <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                        <div className="bg-base-300 text-info rounded-full w-10 border border-info/30">
                            <span className="text-sm font-bold">{getInitials(event.host.username)}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-info font-semibold uppercase tracking-widest">Hosted by</p>
                        <p className="text-sm font-medium">{event.host.username}</p>
                    </div>
                </div>

                {error && <PopUpError message="Failed to update event"/>}

                <button className="btn btn-info w-full font-bold">Join Event</button>

            </div>
                {editEvent && <EditEventForm event={event} onClose={() => setEditEvent(false)}/>}
        </div>
    );
}