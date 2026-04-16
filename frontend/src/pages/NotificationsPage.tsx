import FriendRequest from "../components/FriendRequest.tsx";
import type {FriendRequestType} from "../types/friendRequestType.ts";
import {useEffect, useState} from "react";
import {acceptFriendRequest, findAllFriendRequests, rejectFriendRequest} from "../api/friend.ts";
import CredentialError from "../components/CredentialError.tsx";

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
                return <CredentialError message="Something went wrong Could not reach requests"/>
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

    console.log(friendRequests);

    if (loading) return <span className="font-bold text-[#6B8E23]">Loading...</span>

    return (
        friendRequests.map(friendRequest => <FriendRequest key={friendRequest.id} senderId={friendRequest.sender} username={friendRequest.senderUsername} onChange={handleChange}/>)
    )
}