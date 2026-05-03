import FriendRequest from "../components/FriendRequest.tsx";
import type {FriendRequestType} from "../types/friendRequestType.ts";
import {useEffect, useState} from "react";
import {acceptFriendRequest, findAllFriendRequests, rejectFriendRequest} from "../api/friend.ts";
import PopUpError from "../components/PopUpError.tsx";
import Sidebar from "../components/Sidebar.tsx";
import {Bell} from "lucide-react";

export default function NotificationsPage(){
    const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([]);
    const [loading, setLoading] = useState(true);
    const [render, setRender] = useState(false);

    //Component renders and then runs useEffect. Notice that useEffect has two setStates, which also cause a re-render.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiFriendRequests: FriendRequestType[] = await findAllFriendRequests();
                setFriendRequests(apiFriendRequests);
            } catch{
                return <PopUpError message="Something went wrong Could not reach requests"/>
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [render]);

    function handleChange (isAccepted: boolean, senderId: number) {
        setRender(prev => !prev);
        if (isAccepted) return acceptFriendRequest(senderId);
        return rejectFriendRequest(senderId);
    }

    if (loading) return <span className="font-bold text-[#6B8E23]">Loading...</span>

    return (
        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar onPostCreated={() => {}} />
            <main className="flex-1 ml-60 flex justify-center">
                <div className="w-full max-w-2xl min-h-screen pb-24">
                    <header className="sticky px-6 pt-10 pb-6">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-white/90">Notificaciones</h1>
                            {friendRequests.length > 0 && (
                                <p className="text-sm text-white/40 mt-1">
                                    {friendRequests.length} solicitud {friendRequests.length > 1 ? "es" : ""} pendiente {friendRequests.length > 1 ? "s" : ""}
                                </p>
                            )}
                        </div>
                    </header>
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <span className="loading loading-spinner loading-md text-[#8A9A5B]" />
                        </div>
                    ) : friendRequests.length === 0 ? (
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
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}