import {useCallback, useEffect, useState} from "react";
import {ChevronRight, Users} from "lucide-react";
import {socket} from "../../../api/sockets/config.ts";
import {useMessages} from "../../../hooks/groups/useMessages.ts";
import useGroup from "../../../hooks/groups/useGroup.ts";
import ChatMessages from "./ChatMessages.tsx";

const VITE_API_URL = import.meta.env.VITE_API_URL;

interface Props {
    groupId: number;
    onShowDetail?: () => void;
}

export function GroupChat({groupId, onShowDetail}: Props) {
    const {data: group, isLoading} = useGroup(groupId);
    const {messages, handleUpdate} = useMessages(groupId);
    const [message, setMessage] = useState('');

    useEffect(() => {
        function onConnect() {
            socket.emit("joinGroup", groupId);
        }

        function onError(error: { message: string }) {
            console.error(error.message);
        }

        socket.connect()
        socket.on("connect", onConnect);
        socket.on("error", onError);
        return () => {
            socket.off("connect", onConnect);
            socket.off("error", onError);
            socket.disconnect();
        }
    }, [groupId]);

    useEffect(() => {
        socket.on("newMessage", handleUpdate)

        return () => {
            socket.off("newMessage")
        };
    }, [groupId, handleUpdate]);


    const handleSend = useCallback(() => {
        if (!message.trim()) return;
        socket.emit("message", {content: message, groupId});

        setMessage("");
    }, [message, setMessage, groupId]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const imageUrl = group?.imageId ? `${VITE_API_URL}image/${group.imageId}` : null;

    return (
        <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
            <button
                type="button"
                onClick={onShowDetail}
                className="flex items-center gap-3 px-5 py-3 bg-[#1e1e1e] border-b border-white/5 hover:bg-white/[0.04] transition-colors shrink-0 text-left"
            >
                {isLoading ? (
                    <div className="w-9 h-9 rounded-full bg-white/5 shrink-0 animate-pulse" />
                ) : imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={group.name}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8A9A5B] to-[#6b7a46] flex items-center justify-center shrink-0">
                        <Users size={16} className="text-white/80" />
                    </div>
                )}
                <span className="flex-1 text-sm font-semibold text-white/90 truncate">
                    {isLoading ? <span className="text-white/40">Loading...</span> : group.name}
                </span>
                <ChevronRight size={16} className="text-white/30 shrink-0" />
            </button>
            <ChatMessages messages={messages ?? []}/>
            <div className="flex items-center gap-2 border-t border-white/5 px-4 py-3">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Write a message..."
                    className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#8A9A5B]/50 focus:bg-white/[0.08] transition-all"
                />
                <button
                    type="button"
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all bg-[#8A9A5B] hover:bg-[#728249] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

