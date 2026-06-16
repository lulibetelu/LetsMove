import type {EventSignUp, EventType} from "../../types/eventTypes.ts";
import {useState} from "react";
import {CalendarDays, Lock, MapPin, UserCircle, Users} from "lucide-react";
import {exitEvent, joinEvent, findEventParticipants} from "../../api/event.ts";
import {useQuery} from "@tanstack/react-query";
import {formatDate} from "../../resusable-functions/formatDate.ts";
import {formatTime} from "../../resusable-functions/formatTime.ts";
import PopUpError from "../PopUpError.tsx";
import ProfileLink from "../profile/ProfileLink.tsx";
import ImageViewer from "../ImageViewer.tsx";

interface Props {
    event: EventType;
    signUp: EventSignUp | null;
    onJoined: () => void;
}

export default function InPersonPublicView({event, signUp, onJoined}: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [coverViewerOpen, setCoverViewerOpen] = useState(false);
    const url = import.meta.env.VITE_API_URL;

    const joined = signUp?.state === 'Accepted';
    const eventReq = signUp?.state === 'Requested';

    const coverImage = event.imageEvents?.find(img => img.description === "Cover");

    const {data: participants} = useQuery({
        queryKey: ['eventParticipants', event.id],
        queryFn: () => findEventParticipants(event.id),
    });

    const acceptedParticipants = participants?.filter(
        (p: EventSignUp) => p.state === 'Accepted'
    ) ?? [];

    const handleJoin = async () => {
        setLoading(true);
        setError(null);
        try {
            if (!joined && !eventReq) {
                await joinEvent(event.id);
            } else if (joined || eventReq) {
                await exitEvent(event.id);
            }
            onJoined();
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-6">

            {/* Cover */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-8">
                {coverImage ? (
                    <img
                        src={coverImage.image.url ?? `${url}image/${coverImage.image.id}`}
                        alt={event.title}
                        onClick={() => setCoverViewerOpen(true)}
                        className="w-full h-full object-cover cursor-pointer"
                    />
                ) : (
                    <div className="w-full h-full" style={{background: "linear-gradient(135deg, #8A9A5B 0%, #6b7a46 100%)"}}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <CalendarDays size={120} strokeWidth={0.8}/>
                        </div>
                    </div>
                )}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/80 border border-white/10">
                        In Person
                    </span>
                    {event.isPrivate && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                            <Lock size={11} className="text-white/70"/>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Private</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left column */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Title + host */}
                    <div>
                        <h1 className="text-3xl font-bold text-white/90 leading-tight mb-3">{event.title}</h1>
                        <div className="flex items-center gap-2">
                            <UserCircle size={18} strokeWidth={1.5} className="text-white/30"/>
                            <span className="text-sm text-white/40">Hosted by</span>
                            <ProfileLink username={event.host.username} userId={event.host.id}/>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white/30">Description</h2>
                        <p className="text-sm text-white/60 leading-relaxed">{event.description}</p>
                    </div>

                    {/* Participants */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-white/30">Participants</h2>
                            {acceptedParticipants.length > 0 && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8A9A5B]/10 text-[#8A9A5B]">
                                    {acceptedParticipants.length}
                                </span>
                            )}
                        </div>

                        {acceptedParticipants.length === 0 ? (
                            <div className="flex items-center gap-2 text-white/20 py-4">
                                <Users size={18} strokeWidth={1}/>
                                <p className="text-sm">No participants yet</p>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                {acceptedParticipants.map((p: EventSignUp) => (
                                    <div key={p.userId} className="flex items-center gap-2 bg-[#1e1e1e] border border-white/5 rounded-full px-3 py-1.5">
                                        <UserCircle size={16} strokeWidth={1.5} className="text-white/30"/>
                                        <ProfileLink username={p.user.username} userId={p.user.id} color={"white/70"} textSize={"xs"}/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="flex flex-col gap-4">
                    <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-5 flex flex-col gap-4">

                        {/* Date */}
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A9A5B]">Date</span>
                            <p className="text-sm text-white/70">{formatDate(event.startingDate)}</p>
                            <p className="text-xs text-white/40">{formatTime(event.startingDate)}</p>
                        </div>

                        {/* Location */}
                        {event.location && (
                            <div className="flex items-start gap-2 pt-3 border-t border-white/5">
                                <MapPin size={14} className="text-[#8A9A5B] shrink-0 mt-0.5"/>
                                <p className="text-sm text-white/50">{event.location.location}</p>
                            </div>
                        )}

                        {/* Host */}
                        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                            <UserCircle size={14} strokeWidth={1.5} className="text-white/30 shrink-0"/>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Hosted by</p>
                                <p className="text-sm text-white/70">{event.host.username}</p>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
                            {joined ? (
                                <button
                                    onClick={handleJoin}
                                    disabled={loading}
                                    className="group w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none bg-[#8A9A5B] hover:bg-red-400/20 hover:text-red-400 text-white"
                                >
                                    {loading ? "Loading..." : (
                                        <>
                                            <span className="group-hover:hidden">Joined</span>
                                            <span className="hidden group-hover:inline">Leave</span>
                                        </>
                                    )}
                                </button>
                            ) : eventReq ? (
                                <button
                                    onClick={handleJoin}
                                    disabled={loading}
                                    className="group w-full py-2.5 rounded-xl text-sm font-semibold border border-white/15 text-white/50 hover:border-red-400/50 hover:text-red-400 transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {loading ? "Loading..." : (
                                        <>
                                            <span className="group-hover:hidden">Pending</span>
                                            <span className="hidden group-hover:inline">Cancel</span>
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    onClick={handleJoin}
                                    disabled={loading}
                                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
                                    style={{background: "linear-gradient(135deg, #8A9A5B, #6b7a46)"}}
                                >
                                    {loading ? "Loading..." : "Join Event"}
                                </button>
                            )}
                            {error && <PopUpError message={error} />}
                        </div>
                    </div>
                </div>
            </div>
            {coverViewerOpen && coverImage && (
                <ImageViewer
                    images={[{ src: coverImage.image.url ?? `${url}image/${coverImage.image.id}` }]}
                    onClose={() => setCoverViewerOpen(false)}
                />
            )}
        </div>
    );
}
