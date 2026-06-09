import type { EventType } from "../../types/eventTypes.ts";
import Sidebar from "../Sidebar.tsx";
import EditButton from "../buttons/EditButton.tsx";
import {useState} from "react";
import EditEventForm from "./EditEventForm.tsx";
import DeleteButton from "../buttons/DeleteButton.tsx";
import {eliminateEvent} from "../../api/event.ts";
import {useNavigate} from "react-router-dom";
import PopUpError from "../PopUpError.tsx";
import {getCurrentUserId} from "../../api/user.ts";
import useOneEventEntry from "../../hooks/events/useOneEventEntry.ts";
import {useQueryClient} from "@tanstack/react-query";
import InPersonPublicView from "./InPersonPublicView.tsx";
import InPersonPrivateView from "./InPersonPrivateView.tsx";

interface Props {
    event: EventType;
}

export default function InPersonEventDetail({ event }: Props) {
    const [editEvent, setEditEvent] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const userId = getCurrentUserId();
    const isOwner = userId === event.hostId;
    const queryClient = useQueryClient();
    const { data: signUp } = useOneEventEntry(event.id);
    const isMember = signUp?.state === 'Accepted';

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
    }

    return (
        <div className="card bg-base-200 border border-base-300 max-w-4xl mx-auto shadow-xl overflow-hidden">
            <Sidebar/>
            {isOwner && <div className="absolute top-4 right-4 flex gap-2 z-10">
                <EditButton handleClick={() => setEditEvent(true)}/>
                <DeleteButton handleClick={handleEventDeletion}/>
            </div>}
            {isMember || isOwner ? (
                <InPersonPrivateView event={event} isHost={isOwner} onLeft={handleInvalidate} />
            ) : (
                <InPersonPublicView
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
        </div>
    );
}
