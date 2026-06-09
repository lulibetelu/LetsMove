import type {EventType} from "../../types/eventTypes.ts";
import Sidebar from "../Sidebar.tsx";
import {getCurrentUserId} from "../../api/user.ts";
import PrivateEventView from "./PrivateEventView.tsx";
import PublicEventView from "./PublicEventView.tsx";
import useOneEventEntry from "../../hooks/events/useOneEventEntry.ts";
import {useQueryClient} from "@tanstack/react-query";

interface Props {
    event: EventType;
}

export default function AsyncEventPage({event}: Props) {
    const queryClient = useQueryClient();
    const { data: signUp } = useOneEventEntry(event.id);
    const userId = getCurrentUserId();
    const isHost = userId === event.hostId;
    const isMember = signUp?.state === 'Accepted';

    const handleInvalidate = () => {
        queryClient.invalidateQueries({ queryKey: ['oneEventSignUp', event.id, userId] });
    };

    if (isMember || isHost) {
        return (
            <div className="min-h-screen bg-[#141414] flex">
                <Sidebar/>
                <main className="flex-1 ml-60">
                    <PrivateEventView event={event} onLeft={handleInvalidate} />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar/>
            <main className="flex-1 ml-60">
                {(isMember || isHost) ? (
                    <PrivateEventView event={event} onLeft={handleInvalidate} />
                ) : (
                    <PublicEventView
                        event={event}
                        signUp={signUp ?? null}
                        onJoined={handleInvalidate}
                    />
                )}
            </main>
        </div>
    );
}