import type { EventType } from "../types/eventTypes.ts";

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

export default function InPersonEventDetail({ event }: Props) {
    return (
        <div className="card bg-base-200 border border-base-300 max-w-2xl mx-auto shadow-xl overflow-hidden">
            <div className="h-1 w-full bg-primary" />

            <div className="card-body gap-4">
                <div>
                    <div className="badge badge-primary badge-outline text-xs font-semibold tracking-widest uppercase mb-2">
                        In Person
                    </div>
                    <h2 className="card-title text-2xl font-bold">{event.title}</h2>
                    <p className="text-base-content/60 text-sm leading-relaxed mt-1">
                        {event.description}
                    </p>
                </div>

                <div className="divider my-0" />

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-base-300 rounded-xl p-4">
                        <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">Start</p>
                        <p className="text-sm font-medium">{formatDate(event.startingDate)}</p>
                        <p className="text-sm text-primary">{formatTime(event.startingDate)}</p>
                    </div>
                    <div className="bg-base-300 rounded-xl p-4">
                        <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">End</p>
                        <p className="text-sm font-medium">
                            {event.endingDate ? formatDate(event.endingDate) : "Open ended"}
                        </p>
                        {event.endingDate && (
                            <p className="text-sm text-primary">{formatTime(event.endingDate)}</p>
                        )}
                    </div>
                </div>

                {event.locationId && (
                    <div className="bg-base-300 rounded-xl p-4 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z" />
                            <circle cx="12" cy="8" r="2" />
                        </svg>
                        <div>
                            <p className="text-xs font-semibold text-primary tracking-widest uppercase">Location</p>
                            <p className="text-sm font-medium">Location #{event.locationId}</p>
                        </div>
                    </div>
                )}

                <div className="divider my-0" />

                <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                        <div className="bg-base-300 text-primary rounded-full w-10 border border-primary/30">
                            <span className="text-sm font-bold">H</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-primary font-semibold uppercase tracking-widest">Hosted by</p>
                        <p className="text-sm font-medium">Host #{event.hostId}</p>
                    </div>
                </div>

                <button className="btn btn-primary w-full font-bold">Join Event</button>
            </div>
        </div>
    );
}