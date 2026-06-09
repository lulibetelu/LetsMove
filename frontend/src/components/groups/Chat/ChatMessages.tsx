import type {Message} from "../../../types/messageType.ts";

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
    if (messages?.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-white/40 text-sm">No messages yet</p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages?.map((message) => (
                <div key={message.id} className="flex flex-col">
                    <div className="bg-[#1e1e1e] border border-white/5 rounded-lg px-4 py-3 max-w-[80%]">
                        {message.images?.url && (
                            <img
                                src={message.images.url}
                                alt={message.images.description ?? "Message image"}
                                className="rounded-md mb-2 max-h-60 w-full object-cover"
                            />
                        )}
                        {message.content && (
                            <p className="text-white/90 text-sm whitespace-pre-wrap break-words">{message.content}</p>
                        )}
                        <p className="text-white/30 text-xs mt-1">
                            {formatMessageDate(message.date)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
