import type { EventType } from "../types/eventTypes.ts";
import Sidebar from "../components/Sidebar.tsx";

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

export default function InPersonEventDetail({ event }: Props) {
    return (
        <div className="card bg-base-200 border border-base-300 max-w-4xl mx-auto shadow-xl overflow-hidden">
            <Sidebar onPostCreated={() => null}/>
            <div className="h-1 w-full bg-success" />

            <div className="card-body gap-4">

                <div>
                    <div className="badge badge-success badge-outline text-xs font-semibold tracking-widest uppercase mb-2">
                        In Person
                    </div>
                    <h2 className="card-title text-2xl font-bold">{event.title}</h2>
                    <p className="text-base-content/60 text-sm leading-relaxed mt-1">
                        {event.description}
                    </p>
                </div>

                <div className="divider my-0" />

                <div className="bg-base-300 rounded-xl p-4">
                    <p className="text-xs font-semibold text-success tracking-widest uppercase mb-1">Date</p>
                    <p className="text-sm font-medium">{formatDate(event.startingDate)}</p>
                    <p className="text-sm text-success">{formatTime(event.startingDate)}</p>
                </div>

                {event.location && (
                    <div className="bg-base-300 rounded-xl p-4 flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-success shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z" />
                            <circle cx="12" cy="8" r="2" />
                        </svg>
                        <div>
                            <p className="text-xs font-semibold text-success tracking-widest uppercase mb-1">Location</p>
                            <p className="text-sm font-medium">{event.location.location}</p>
                        </div>
                    </div>
                )}

                <div className="divider my-0" />

                <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                        <div className="bg-base-300 text-success rounded-full w-10 border border-success/30">
                            <span className="text-sm font-bold">{getInitials(event.host.username)}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-success font-semibold uppercase tracking-widest">Hosted by</p>
                        <p className="text-sm font-medium">{event.host.username}</p>
                    </div>
                </div>

                <button className="btn btn-success w-full font-bold">Join Event</button>

            </div>
        </div>
    );
}