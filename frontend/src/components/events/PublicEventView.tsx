import type {EventSignUp, EventType} from "../../types/eventTypes.ts";
import {CalendarDays, Lock, MapPin, UserCircle, Users} from "lucide-react";
import {useState} from "react";
import {exitEvent, joinEvent} from "../../api/event.ts";
import {useQuery} from "@tanstack/react-query";
import {findEventParticipants} from "../../api/event.ts";
import {formatDate} from "../../resusable-functions/formatDate.ts";
import {formatTime} from "../../resusable-functions/formatTime.ts";

interface Props {
    event: EventType;
    signUp: EventSignUp | null;
    onJoined: () => void;
}

export default function PublicEventView({event, signUp, onJoined}: Props) {
    const [joined, setJoined] = useState(signUp?.state === 'Accepted');
    const [eventReq, setEventReq] = useState(signUp?.state === 'Requested');

    const coverImage = event.imageEvents?.find(img => img.description === "Cover");

    const {data: participants} = useQuery({
        queryKey: ['eventParticipants', event.id],
        queryFn: () => findEventParticipants(event.id),
    });

    const acceptedParticipants = participants?.filter(
        (p: EventSignUp) => p.state === 'Accepted'
    ) ?? [];

    const handleJoin = async () => {
        if (!joined && !eventReq) {
            await joinEvent(event.id);
            if (event.isPrivate) {
                setEventReq(true);
            } else {
                setJoined(true);
                onJoined();
            }
        } else if (joined) {
            await exitEvent(event.id);
            setJoined(false);
        } else if (eventReq) {
            await exitEvent(event.id);
            setEventReq(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-6">

            {/* Cover */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-8">
                {coverImage ? (
                    <img src={coverImage.image.url} alt={event.title} className="w-full h-full object-cover"/>
                ) : (
                    <div className="w-full h-full" style={{background: "linear-gradient(135deg, #8A9A5B 0%, #6b7a46 100%)"}}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <CalendarDays size={120} strokeWidth={0.8}/>
                        </div>
                    </div>
                )}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/80 border border-white/10">
                        {event.eventType === 'InPerson' ? 'Presencial' : 'Online'}
                    </span>
                    {event.isPrivate && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                            <Lock size={11} className="text-white/70"/>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Privado</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Columna izquierda */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Título y host */}
                    <div>
                        <h1 className="text-3xl font-bold text-white/90 leading-tight mb-3">{event.title}</h1>
                        <div className="flex items-center gap-2">
                            <UserCircle size={18} strokeWidth={1.5} className="text-white/30"/>
                            <span className="text-sm text-white/40">Organizado por</span>
                            <span className="text-sm font-semibold text-[#8A9A5B]">{event.host.username}</span>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white/30">Descripción</h2>
                        <p className="text-sm text-white/60 leading-relaxed">{event.description}</p>
                    </div>

                    {/* Participantes */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-white/30">Participantes</h2>
                            {acceptedParticipants.length > 0 && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8A9A5B]/10 text-[#8A9A5B]">
                                    {acceptedParticipants.length}
                                </span>
                            )}
                        </div>

                        {acceptedParticipants.length === 0 ? (
                            <div className="flex items-center gap-2 text-white/20 py-4">
                                <Users size={18} strokeWidth={1}/>
                                <p className="text-sm">Todavía no hay participantes</p>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                {acceptedParticipants.map((p: EventSignUp) => (
                                    <div key={p.userId} className="flex items-center gap-2 bg-[#1e1e1e] border border-white/5 rounded-full px-3 py-1.5">
                                        <UserCircle size={16} strokeWidth={1.5} className="text-white/30"/>
                                        <span className="text-xs font-medium text-white/60">{p.user.username}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar derecho */}
                <div className="flex flex-col gap-4">
                    <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-5 flex flex-col gap-4">

                        {/* Fechas */}
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A9A5B]">
                                    {event.endingDate ? "Desde" : "Fecha"}
                                </span>
                                <p className="text-sm text-white/70">{formatDate(event.startingDate)}</p>
                                <p className="text-xs text-white/40">{formatTime(event.startingDate)}</p>
                            </div>
                            {event.endingDate && (
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A9A5B]">Hasta</span>
                                    <p className="text-sm text-white/70">{formatDate(event.endingDate)}</p>
                                    <p className="text-xs text-white/40">{formatTime(event.endingDate)}</p>
                                </div>
                            )}
                        </div>

                        {/* Ubicación */}
                        {event.location && (
                            <div className="flex items-start gap-2 pt-3 border-t border-white/5">
                                <MapPin size={14} className="text-[#8A9A5B] shrink-0 mt-0.5"/>
                                <p className="text-sm text-white/50">{event.location.location}</p>
                            </div>
                        )}

                        {/* Botón */}
                        <div className="pt-3 border-t border-white/5">
                            {joined ? (
                                <button
                                    onClick={handleJoin}
                                    className="group w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] bg-[#8A9A5B] hover:bg-red-400/20 hover:text-red-400 text-white"
                                >
                                    <span className="group-hover:hidden">Joined</span>
                                    <span className="hidden group-hover:inline">Leave</span>
                                </button>
                            ) : eventReq ? (
                                <button
                                    onClick={handleJoin}
                                    className="group w-full py-2.5 rounded-xl text-sm font-semibold border border-white/15 text-white/50 hover:border-red-400/50 hover:text-red-400 transition-all active:scale-[0.97]"
                                >
                                    <span className="group-hover:hidden">Pending</span>
                                    <span className="hidden group-hover:inline">Cancel</span>
                                </button>
                            ) : (
                                <button
                                    onClick={handleJoin}
                                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.97]"
                                    style={{background: "linear-gradient(135deg, #8A9A5B, #6b7a46)"}}
                                >
                                    Unirse
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}