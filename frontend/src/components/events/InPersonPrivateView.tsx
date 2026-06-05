import type {EventSignUp, EventType} from "../../types/eventTypes.ts";
import {useState} from "react";
import {exitEvent, findEventParticipants} from "../../api/event.ts";
import {useQuery} from "@tanstack/react-query";
import PopUpError from "../PopUpError.tsx";

interface Props {
    event: EventType;
    isHost: boolean;
    onLeft: () => void;
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

export default function InPersonPrivateView({event, isHost, onLeft}: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const url = import.meta.env.VITE_API_URL;

    const {data: participants} = useQuery({
        queryKey: ['eventParticipants', event.id],
        queryFn: () => findEventParticipants(event.id),
    });

    const acceptedParticipants = participants?.filter(
        (p: EventSignUp) => p.state === 'Accepted'
    ) ?? [];

    const handleLeave = async () => {
        setLoading(true);
        setError(null);
        try {
            await exitEvent(event.id);
            onLeft();
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const coverImage = event.imageEvents?.find(img => img.description === "Cover");

    return (
        <>
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

                {coverImage && (
                    <div className="rounded-xl overflow-hidden">
                        <img
                            src={coverImage.image.url ?? `${url}image/${coverImage.image.id}`}
                            alt={event.title}
                            className="w-full h-48 object-cover"
                        />
                    </div>
                )}

                <div className="divider my-0" />

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-success tracking-widest uppercase">
                            Participants
                        </p>
                        {acceptedParticipants.length > 0 && (
                            <span className="badge badge-success badge-outline badge-sm">
                                {acceptedParticipants.length}
                            </span>
                        )}
                    </div>

                    {acceptedParticipants.length === 0 ? (
                        <p className="text-sm text-base-content/40 py-2">No participants yet</p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {acceptedParticipants.map((p: EventSignUp) => (
                                <div key={p.userId} className="flex items-center gap-2 bg-base-300 rounded-full px-3 py-1.5">
                                    <div className="avatar placeholder">
                                        <div className="bg-base-200 text-success rounded-full w-6">
                                            <span className="text-xs font-bold">{getInitials(p.user.username)}</span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium">{p.user.username}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {!isHost && (
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleLeave}
                            disabled={loading}
                            className="group btn btn-outline btn-error w-full font-bold disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {loading ? "Loading..." : "Leave Event"}
                        </button>
                        {error && <PopUpError message={error} />}
                    </div>
                )}
            </div>
        </>
    );
}
