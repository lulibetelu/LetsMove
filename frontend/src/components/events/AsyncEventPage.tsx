import type {EventType} from "../../types/eventTypes.ts";
import Sidebar from "../Sidebar.tsx";
import {getCurrentUserId} from "../../api/user.ts";
import PrivateEventView from "./PrivateEventView.tsx";
import PublicEventView from "./PublicEventView.tsx";
import useOneEventEntry from "../../hooks/events/useOneEventEntry.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import EditButton from "../buttons/EditButton.tsx";
import DeleteButton from "../buttons/DeleteButton.tsx";
import EditEventForm from "./EditEventForm.tsx";
import {eliminateEvent} from "../../api/event.ts";
import {useNavigate} from "react-router-dom";
import PopUpError from "../PopUpError.tsx";

interface Props {
    event: EventType;
}

export default function AsyncEventPage({event}: Props) {
    const queryClient = useQueryClient();
    const { data: signUp } = useOneEventEntry(event.id);
    const userId = getCurrentUserId();
    const isHost = userId === event.hostId;
    const isMember = signUp?.state === 'Accepted';
    const [editEvent, setEditEvent] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleInvalidate = () => {
        queryClient.invalidateQueries({ queryKey: ['oneEventSignUp', event.id, userId] });
    };

    const handleEventDeletion = async () => {
        try {
            await eliminateEvent(event.id);
            navigate(`/profile/${userId}?tab=events`);
        }catch {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar/>
            <main className="flex-1 ml-60 relative">
                {isHost && <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <EditButton handleClick={() => setEditEvent(true)}/>
                    <DeleteButton handleClick={handleEventDeletion}/>
                </div>}
                {(isMember || isHost) ? (
                    <PrivateEventView event={event} onLeft={handleInvalidate} />
                ) : (
                    <PublicEventView
                        event={event}
                        signUp={signUp ?? null}
                        onJoined={handleInvalidate}
                    />
                )}
                {error && <PopUpError message="Failed to update event"/>}
                {editEvent && <EditEventForm event={event} onClose={() => {
                    setEditEvent(false);
                    queryClient.invalidateQueries({ queryKey: ['event', event.id] });
                }}/>}
            </main>
        </div>
    );
}