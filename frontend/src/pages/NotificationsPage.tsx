import FriendRequest from "../components/FriendRequest.tsx";
import type {FriendRequestType} from "../types/friendRequestType.ts";
import {useEffect, useState} from "react";
import {acceptFriendRequest, findAllFriendRequests, rejectFriendRequest} from "../api/friend.ts";
import PopUpError from "../components/PopUpError.tsx";
import Sidebar from "../components/Sidebar.tsx";
import {Bell} from "lucide-react";
import {acceptParticipant, findEventParticipants, findEventsFromHost, rejectParticipant} from "../api/event.ts";
import type {EventType, PendingParticipant} from "../types/eventTypes.ts";
import EventParticipantRequest from "../components/EventParticipantRequest.tsx";

export default function NotificationsPage(){
    const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([]);
    const [loading, setLoading] = useState(true);
    const [render, setRender] = useState(false);
    const [pendingParticipants, setPendingParticipants] = useState<PendingParticipant[]>([])

    //Component renders and then runs useEffect. Notice that useEffect has two setStates, which also cause a re-render.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiFriendRequests: FriendRequestType[] = await findAllFriendRequests();
                setFriendRequests(apiFriendRequests);

                const events: EventType[] = await findEventsFromHost();
                const privateEvents = events.filter(e => e.isPrivate);
                const allParticipants = await Promise.all(
                    privateEvents.map(async (event) => {
                        const signUps = await findEventParticipants(event.id);
                        return signUps
                            .filter((s: { state: string }) => s.state === 'Requested')
                            .map((s: PendingParticipant) => ({
                                ...s,
                                eventTitle: event.title,
                            }));
                    })
                );
                setPendingParticipants(allParticipants.flat());

            } catch{
                return <PopUpError message="Something went wrong Could not reach requests"/>
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [render]);

    function handleFriendChange (isAccepted: boolean, senderId: number) {
        setRender(prev => !prev);
        if (isAccepted) return acceptFriendRequest(senderId);
        return rejectFriendRequest(senderId);
    }

    const handleParticipantChange = (isAccepted: boolean, userId: number, eventId: number) => {
        setRender(prev => !prev);
        if (isAccepted) return acceptParticipant(userId, eventId);
        return rejectParticipant(userId, eventId);
    };

    const totalNotifications = friendRequests.length + pendingParticipants.length;
    // if (loading) return <span className="font-bold text-[#6B8E23]">Loading...</span>

    return (
        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar onPostCreated={() => {}} />

            <main className="flex-1 ml-60 flex justify-center">
                <div className="w-full max-w-2xl min-h-screen pb-24">

                    <header className="sticky px-6 pt-10 pb-6">
                        <h1 className="text-2xl font-bold text-white/90">Notificaciones</h1>
                        {totalNotifications > 0 && (
                            <p className="text-sm text-white/40 mt-1">
                                {totalNotifications} pendiente {totalNotifications > 1 ? "s" : ""} pendiente {friendRequests.length > 1 ? "s" : ""}
                            </p>
                        )}
                    </header>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <span className="loading loading-spinner loading-md text-[#8A9A5B]" />
                        </div>
                    ) : totalNotifications === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-3 text-white/30">
                                <Bell size={40} strokeWidth={1} />
                                <p className="text-sm">No tenés notificaciones por ahora</p>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {friendRequests.map(friendRequest =>
                                    <FriendRequest
                                        key={friendRequest.id}
                                        senderId={friendRequest.sender}
                                        username={friendRequest.senderUsername}
                                        onChange={handleFriendChange}
                                    />
                                )}
                                {pendingParticipants.map(participant => (
                                    <EventParticipantRequest
                                        key={`${participant.eventId}-${participant.userId}`}
                                        participant={participant}
                                        onChange={handleParticipantChange}
                                    />
                                ))}
                            </div>
                        )
                    }
                </div>
            </main>
        </div>
    )
}