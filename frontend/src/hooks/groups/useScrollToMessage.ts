import {useRef, useEffect} from "react";
import type {Message} from "../../types/messageType.ts";

export function useScrollToMessage(messages: Message[] | undefined) {
    const containerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const sorted = messages
        ? [...messages].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        : [];

    useEffect(() => {
        if (sorted.length === 0) return;
        bottomRef.current?.scrollIntoView({behavior: "instant"});
    }, [sorted.length]);

    return {containerRef, bottomRef, sorted};
}
