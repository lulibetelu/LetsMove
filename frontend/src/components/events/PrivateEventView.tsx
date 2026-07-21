import type {EventEntry, EventSignUp, EventType} from "../../types/eventTypes.ts";
import {CalendarDays, UserCircle, Plus, Trash2, Flame, Lock, MapPin, Users} from "lucide-react";
import {useState} from "react";
import {createEventEntry, deleteEventEntry, exitEvent, findEventParticipants} from "../../api/event.ts";
import {useEventEntries} from "../../hooks/events/useEventEntries.ts";
import {getCurrentUserId} from "../../api/user.ts";
import {useQueryClient, useQuery} from "@tanstack/react-query";
import {formatRelative, formatDate} from "../../resusable-functions/formatDate.ts";
import {formatTime} from "../../resusable-functions/formatTime.ts";
import type {ImageInput} from "../../types/imageType.ts";

import ImagePicker from "../ImagePicker.tsx";
import PopUpError from "../PopUpError.tsx";
import EditButton from "../buttons/EditButton.tsx";
import DeleteButton from "../buttons/DeleteButton.tsx";
import ProfileLink from "../profile/ProfileLink.tsx";
import ImageViewer from "../ImageViewer.tsx";
interface Props {
    event: EventType;
    onLeft: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

function calculateStreak(entries: EventEntry[], userId: number | null): number {
    if (!userId) return 0;

    const userEntries = entries
        .filter(e => e.userId === userId)
        .map(e => new Date(e.createdAt).toDateString());

    const uniqueDays = [...new Set(userEntries)];
    const today = new Date();

    const hasToday = uniqueDays.includes(today.toDateString());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const hasYesterday = uniqueDays.includes(yesterday.toDateString());

    if (!hasToday && !hasYesterday) return 0;

    let streak = 0;
    const startFrom = hasToday ? 0 : 1;

    for (let i = startFrom; ; i++) {
        const expected = new Date(today);
        expected.setDate(today.getDate() - i);
        if (uniqueDays.includes(expected.toDateString())) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

function getLast7Days(entries: EventEntry[], userId: number | null): boolean[] {
    if (!userId) return Array(7).fill(false);

    const userEntryDays = entries
        .filter(e => e.userId === userId)
        .map(e => new Date(e.createdAt).toDateString());

    const uniqueDays = new Set(userEntryDays);
    const result = Array(7).fill(false);
    const today = new Date();

    const hasToday = uniqueDays.has(today.toDateString());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const hasYesterday = uniqueDays.has(yesterday.toDateString());

    if (!hasToday && !hasYesterday) return result;

    const startFrom = hasToday ? 0 : 1;

    for (let i = startFrom; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        if (uniqueDays.has(day.toDateString())) {
            result[day.getDay()] = true;
        } else {
            break;
        }
    }

    return result;
}

export default function PrivateEventView({event, onLeft, onEdit, onDelete}: Props) {
    const [newEntry, setNewEntry] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [leaveLoading, setLeaveLoading] = useState(false);
    const [leaveError, setLeaveError] = useState<string | null>(null);
    const [coverViewerOpen, setCoverViewerOpen] = useState(false);
    const [entryViewer, setEntryViewer] = useState<{ entryIndex: number; imageIndex: number } | null>(null);
    const currentUserId = getCurrentUserId();
    const isHost = currentUserId === event.hostId;
    const queryClient = useQueryClient();

    const handleLeave = async () => {
        setLeaveLoading(true);
        setLeaveError(null);
        try {
            await exitEvent(event.id);
            onLeft();
        } catch (e) {
            setLeaveError(e instanceof Error ? e.message : 'Something went wrong');
        } finally {
            setLeaveLoading(false);
        }
    };
    const [images, setImages] = useState<ImageInput[]>([])
    const url = import.meta.env.VITE_API_URL;


    const {entries, observerRef, isError} = useEventEntries(event.id);

    const {data: participants} = useQuery({
        queryKey: ['eventParticipants', event.id],
        queryFn: () => findEventParticipants(event.id),
    });

    const acceptedParticipants = participants?.filter(
        (p: EventSignUp) => p.state === 'Accepted'
    ) ?? [];

    const streak = calculateStreak(entries, currentUserId);
    const last7Days = getLast7Days(entries, currentUserId);

    const orderedLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const coverImage = event.imageEvents?.find(img => img.description === "Cover");

    const handleSubmitEntry = async () => {
        if (!newEntry.trim()) return;
        setSubmitting(true);
        try {
            await createEventEntry(event.id, newEntry.trim(), images);
            setNewEntry("");
            setImages([]);
            setShowForm(false);
            queryClient.invalidateQueries({queryKey: ['eventEntries', event.id]});
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteEntry = async (entryId: number) => {
        await deleteEventEntry(entryId);
        queryClient.invalidateQueries({queryKey: ['eventEntries', event.id]});
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-6">

            {/* Cover */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6">
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
                        {event.eventType === 'InPerson' ? 'In Person' : 'Online'}
                    </span>
                    {event.isPrivate && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                            <Lock size={11} className="text-white/70"/>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Private</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Title and host */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white/90 leading-tight mb-2">{event.title}</h1>
                <div className="flex items-center gap-2">
                    <UserCircle size={16} strokeWidth={1.5} className="text-white/30"/>
                    <span className="text-sm text-white/40">Hosted by</span>
                    <ProfileLink username={event.host.username} userId={event.host.id}/>
                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/30">Description</h2>
                <p className="text-sm text-white/60 leading-relaxed">{event.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Feed de entradas */}
                <div className="lg:col-span-2 flex flex-col gap-4">

                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white/50 uppercase tracking-widest">
                            Progress
                        </h2>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white transition-all active:scale-95"
                            style={{background: "linear-gradient(135deg, #8A9A5B, #6b7a46)"}}
                        >
                            <Plus size={14}/> Upload progress
                        </button>
                    </div>

                    {/* Formulario */}
                    {showForm && (
                        <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                            <textarea
                                value={newEntry}
                                onChange={(e) => setNewEntry(e.target.value)}
                                placeholder="Share your progress today..."
                                rows={3}
                                className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:border-[#8A9A5B]/50 resize-none transition-colors"
                            />
                            <div className="flex items-center justify-between">
                                <ImagePicker images={images} onChange={setImages}/>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {setShowForm(false); setNewEntry(""); setImages([])}}
                                        className="px-4 py-1.5 rounded-full text-xs font-semibold border border-white/10 text-white/40 hover:text-white/60 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmitEntry}
                                        disabled={submitting || !newEntry.trim()}
                                        className="px-4 py-1.5 rounded-full text-xs font-semibold text-white transition-all active:scale-95 disabled:opacity-40"
                                        style={{background: "linear-gradient(135deg, #8A9A5B, #6b7a46)"}}
                                    >
                                        {submitting ? "Posting..." : "Post"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isError && (
                        <p className="text-sm text-red-400/70 text-center py-4">Error loading entries</p>
                    )}

                    {entries.length === 0 && !isError && (
                        <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/20">
                            <CalendarDays size={40} strokeWidth={1}/>
                            <p className="text-sm">No progress entries yet</p>
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        {entries.map((entry, ei) => (
                            <div key={entry.id} className="bg-[#1e1e1e] rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <UserCircle size={18} strokeWidth={1.5} className="text-white/30"/>
                                        <ProfileLink username={entry.user.username} userId={entry.user.id}/>
                                        <span className="text-xs text-white/25">{formatRelative(entry.createdAt)}</span>
                                    </div>
                                    {(entry.userId === currentUserId || isHost) && (
                                        <button
                                            onClick={() => handleDeleteEntry(entry.id)}
                                            className="text-white/20 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={15} strokeWidth={1.5}/>
                                        </button>
                                    )}
                                </div>
                                <p className="text-sm text-white/70 leading-relaxed">{entry.content}</p>
                                {entry.images.length > 0 && (
                                    <div className="grid grid-cols-2 gap-2">
                                        {entry.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={img.image.url ?? `${url}image/${img.image.id}`}
                                                alt=""
                                                onClick={() => setEntryViewer({ entryIndex: ei, imageIndex: i })}
                                                className="w-full h-32 object-cover rounded-lg cursor-pointer"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {coverViewerOpen && coverImage && (
                        <ImageViewer
                            images={[{ src: coverImage.image.url ?? `${url}image/${coverImage.image.id}` }]}
                            onClose={() => setCoverViewerOpen(false)}
                        />
                    )}
                    {entryViewer && (
                        <ImageViewer
                            images={entries[entryViewer.entryIndex].images.map(img => ({
                                src: img.image.url ?? `${url}image/${img.image.id}`
                            }))}
                            initialIndex={entryViewer.imageIndex}
                            onClose={() => setEntryViewer(null)}
                        />
                    )}

                    <div ref={observerRef} className="h-10"/>
                </div>

                {/* Right sidebar */}
                <div className="flex flex-col gap-5">

                    {/* Streak */}
                    <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-5 flex flex-col gap-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Your streak</h3>
                        <div className="flex items-center gap-3">
                            <Flame
                                size={36}
                                className={streak > 0 ? "text-orange-400" : "text-white/15"}
                                strokeWidth={1.5}
                            />
                            <div>
                                <p className="text-3xl font-bold text-white/90">{streak}</p>
                                <p className="text-xs text-white/30">
                                    {streak === 1 ? "consecutive day" : "consecutive days"}
                                </p>
                            </div>
                        </div>

                        {/* Últimos 7 días */}
                        <div className="flex items-center justify-between mt-1">
                            {last7Days.map((active, i) => (
                                <div key={i} className="flex flex-col items-center gap-1.5">
                                    <div
                                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all
                                            ${active
                                            ? "bg-[#8A9A5B] shadow-[0_0_8px_rgba(138,154,91,0.4)]"
                                            : "bg-white/5 border border-white/5"
                                        }`}
                                    >
                                        {active && <div className="w-2 h-2 rounded-full bg-white/80"/>}
                                    </div>
                                    <span className="text-[10px] text-white/25">{orderedLabels[i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Event info */}
                    <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-5 flex flex-col gap-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Event</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A9A5B]">
                                    {event.endingDate ? "From" : "Date"}
                                </span>
                                <p className="text-sm text-white/70">{formatDate(event.startingDate)}</p>
                                <p className="text-xs text-white/40">{formatTime(event.startingDate)}</p>
                            </div>
                            {event.endingDate && (
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A9A5B]">To</span>
                                    <p className="text-sm text-white/70">{formatDate(event.endingDate)}</p>
                                    <p className="text-xs text-white/40">{formatTime(event.endingDate)}</p>
                                </div>
                            )}
                        </div>
                        {event.location && (
                            <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                                <MapPin size={13} className="text-[#8A9A5B] shrink-0 mt-0.5"/>
                                <p className="text-sm text-white/50">{event.location.location}</p>
                            </div>
                        )}
                    </div>

                    {/* Participants */}
                    <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-5 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Participants</h3>
                            {acceptedParticipants.length > 0 && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8A9A5B]/10 text-[#8A9A5B]">
                                    {acceptedParticipants.length}
                                </span>
                            )}
                        </div>

                        {acceptedParticipants.length === 0 ? (
                            <div className="flex items-center gap-2 text-white/20 py-2">
                                <Users size={16} strokeWidth={1}/>
                                <p className="text-xs">No participants yet</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                                {acceptedParticipants.map((p: EventSignUp) => (
                                    <div key={p.userId} className="flex items-center gap-2">
                                        <UserCircle size={15} strokeWidth={1.5} className="text-white/20 shrink-0"/>
                                        <ProfileLink username={p.user.username} userId={p.user.id} textSize={"xs"} color={"white/50"}/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {isHost ? (
                        <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-5 flex flex-col gap-3">
                            <div className="flex gap-2">
                                <EditButton handleClick={() => onEdit?.()}/>
                                <DeleteButton handleClick={() => onDelete?.()}/>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-[#1e1e1e] rounded-xl border border-white/5 p-5 flex flex-col gap-3">
                            <button
                                onClick={handleLeave}
                                disabled={leaveLoading}
                                className="w-full py-2.5 rounded-xl text-sm font-semibold border border-red-400/30 text-red-400 hover:bg-red-400/10 transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
                            >
                                {leaveLoading ? "Leaving..." : "Leave Event"}
                            </button>
                            {leaveError && <PopUpError message={leaveError} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}