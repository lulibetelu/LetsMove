import type {EventType} from "../../types/eventTypes.ts";
import {CalendarDays, Lock, MapPin, Bookmark} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {formatDate} from "../../resusable-functions/formatDate.ts";
import {formatTime} from "../../resusable-functions/formatTime.ts";
import {useSavedEvents} from "../../hooks/events/useSavedEvents.ts";
interface Props  {
    event : EventType;
}

export default function Event({event}: Props) {
    const navigate = useNavigate();
    const { saved, toggleSave } = useSavedEvents();
    const isSaved = saved.has(event.id);
    const url = import.meta.env.VITE_API_URL;

    const handleSaveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        toggleSave(event.id);
    };

    const coverImage = event.imageEvents?.find(img => img.description === "Cover");

    return (
        <div
            className="bg-[#1e1e1e] rounded-2xl overflow-hidden border border-white/5 hover:-translate-y-1 hover:border-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-200 flex flex-col"
            onClick={() => navigate(`/event/${event.id}`)}
        >

            {/* Event Card */}
            <div
                key={event.id}
                className="relative h-40 w-full shrink-0"
            >
                {coverImage ? (
                        <img
                            src={coverImage.image.url ?? `${url}image/${coverImage.image.id}`}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    ): (
                    <div
                        className="w-full h-full"
                        style={{background: "linear-gradient(135deg, #8A9A5B 0%, #6b7a46 100%)"}}
                    >
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <CalendarDays size={64} strokeWidth={1}/>
                        </div>
                    </div>
                )}

                <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/80 border border-white/10">
                        {event.eventType === "InPerson" ? "Presencial" : "Online"}
                    </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                        onClick={handleSaveClick}
                        className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-black/70 transition-all active:scale-90"
                    >
                        <Bookmark
                            size={12}
                            className={isSaved ? "text-[#8A9A5B] fill-[#8A9A5B]" : "text-white/70"}
                        />
                    </button>
                    {event.isPrivate && (
                        <div className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                            <Lock size={12} className="text-white/70"/>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">

                {/* Title */}
                <h3 className="text-sm font-bold text-white/90 leading-snug line-clamp-2">
                    {event.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
                    {event.description}
                </p>

                <div className="flex flex-col gap-1 mt-1">
                    <p className="flex items-center gap-1.5 text-xs text-white/40">
                        <CalendarDays size={12} className="text-[#8A9A5B] shrink-0"/>
                        {formatDate(event.startingDate)} · {formatTime(event.startingDate)}
                    </p>
                    {event.location && (
                        <p className="flex items-center gap-1.5 text-xs text-white/40">
                            <MapPin size={12} className="text-[#8A9A5B] shrink-0"/>
                            {event.location?.location}
                        </p>
                    )}
                </div>
                <div className="mt-auto pt-3 border-t border-white/5">
                    <span className="text-xs text-white/30">
                      by {event.host?.username ?? `Host #${event.hostId}`}
                    </span>
                </div>

            </div>
        </div>
    );
}
