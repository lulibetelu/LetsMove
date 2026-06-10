import {useCallback, useEffect, useState} from "react";
import {socket} from "../../../api/sockets/config.ts";
import {useMessages} from "../../../hooks/groups/useMessages.ts";
import ChatMessages from "./ChatMessages.tsx";

interface Props {
    groupId: number
}

export function GroupChat({groupId}: Props) {
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
        socket.on("newMessage", (msg) => handleUpdate(msg))

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

    return (
        <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
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

