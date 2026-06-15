import {useEffect, useRef} from "react";
import type {Message} from "../../../types/messageType.ts";
import {getCurrentUserId} from "../../../api/user.ts";

const VITE_API_URL = import.meta.env.VITE_API_URL;

interface Props {
    messages: Message[] | undefined;
}

function formatMessageDate(date: Date) {
    const d = new Date(date);
    const month = d.toLocaleString("en-US", {month: "short"});
    const day = d.getDate();
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    return `${month} ${day}, ${hours}:${minutes}`;
}

export default function ChatMessages({messages}: Props) {
    const currentUserId = getCurrentUserId();
    const bottomRef = useRef<HTMLDivElement>(null);

    const sorted = messages
        ? [...messages].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        : [];

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [sorted.length]);

    if (sorted.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-white/40 text-sm">No messages yet</p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {sorted.map((message) => {
                const isOwn = message.groupMember.userId === currentUserId;
                return (
                    <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                        <div className={`flex flex-col max-w-[80%] ${isOwn ? "items-end" : "items-start"}`}>
                            <div className={`rounded-lg px-4 py-3 ${
                                isOwn
                                    ? "bg-[#8A9A5B]/20 border border-[#8A9A5B]/30"
                                    : "bg-[#1e1e1e] border border-white/5"
                            }`}>
                                {message.images?.map((img) => {
                                    const src = img.image?.url || `${VITE_API_URL}image/${img.imageId}`;
                                    return (
                                        <img
                                            key={img.imageId}
                                            src={src}
                                            alt="Message image"
                                            className="rounded-md mb-2 max-h-60 w-full object-cover"
                                        />
                                    );
                                })}
                                {message.content && (
                                    <p className="text-white/90 text-sm whitespace-pre-wrap break-words">{message.content}</p>
                                )}
                            </div>
                            <div className="flex items-baseline gap-2 mt-1">
                                <p className="text-white/30 text-xs">
                                    {formatMessageDate(message.date)}
                                </p>
                                <p className="text-[11px] text-white/40">
                                    {isOwn ? "Me" : message.groupMember.user.username}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div ref={bottomRef}/>
        </div>
    );
}
