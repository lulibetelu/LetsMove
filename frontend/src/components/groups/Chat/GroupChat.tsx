import {useCallback, useEffect, useRef, useState} from "react";
import {ChevronRight, Image, Users} from "lucide-react";
import {socket} from "../../../api/sockets/config.ts";
import {useMessages} from "../../../hooks/groups/useMessages.ts";
import useGroup from "../../../hooks/groups/useGroup.ts";
import ChatMessages from "./ChatMessages.tsx";
import type {ImageInput} from "../../../types/imageType.ts";

const VITE_API_URL = import.meta.env.VITE_API_URL;

interface Props {
    groupId: number;
    onShowDetail?: () => void;
    onGroupDeleted?: () => void;
}

export function GroupChat({groupId, onShowDetail, onGroupDeleted}: Props) {
    const {data: group, isLoading, isError} = useGroup(groupId);
    const {messages, handleUpdate} = useMessages(groupId);
    const [message, setMessage] = useState('');
    const [imageInputs, setImageInputs] = useState<ImageInput[]>([]);
    const [showImageMenu, setShowImageMenu] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        Promise.all(
            files.map(file => new Promise<ImageInput>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve({content: reader.result as string});
                reader.readAsDataURL(file);
            }))
        ).then(newImages => {
            setImageInputs(prev => [...prev, ...newImages]);
        });
        e.target.value = '';
    };

    const handleRemoveImage = (index: number) => {
        setImageInputs(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddUrl = () => {
        if (!urlInput.trim()) return;
        setImageInputs(prev => [...prev, {url: urlInput.trim()}]);
        setUrlInput('');
        setShowImageMenu(false);
    };

    const handleImageMenuToggle = () => {
        setShowImageMenu(prev => !prev);
    };

    useEffect(() => {
        if (!isLoading && (isError || !group)) {
            onGroupDeleted?.();
        }
    }, [isLoading, isError, group, onGroupDeleted]);

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
        if (!message.trim() && imageInputs.length === 0) return;
        socket.emit("message", {content: message, groupId, images: imageInputs});

        setMessage("");
        setImageInputs([]);
    }, [message, setMessage, groupId, imageInputs]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey && (message.trim() || imageInputs.length > 0)) {
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
                className="flex items-center gap-3 px-5 py-4 bg-[#1e1e1e] border-b border-white/5 hover:bg-white/[0.04] transition-colors shrink-0 text-left"
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
            <div className="border-t border-white/5 px-4 py-3">
                {imageInputs.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {imageInputs.map((img, i) => (
                            <div key={i} className="relative group w-12 h-12 shrink-0">
                                <img
                                    src={img.content ?? img.url}
                                    alt=""
                                    className="w-full h-full rounded-lg object-cover border border-white/10 bg-white/5"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(i)}
                                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center transition-all active:scale-90 opacity-0 group-hover:opacity-100"
                                >
                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M1 1l6 6M7 1l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <Image
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 cursor-pointer hover:text-white/50 transition-colors"
                            onClick={handleImageMenuToggle}
                        />
                        {showImageMenu && (
                            <div className="absolute bottom-full left-0 mb-2 bg-[#1e1e1e] border border-white/10 rounded-xl p-3 flex flex-col gap-2 shadow-xl min-w-[220px] z-50">
                                <button
                                    type="button"
                                    onClick={() => {
                                        fileInputRef.current?.click();
                                        setShowImageMenu(false);
                                    }}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white/60 hover:text-white/80 transition-all text-left"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="17 8 12 3 7 8"/>
                                        <line x1="12" y1="3" x2="12" y2="15"/>
                                    </svg>
                                    Upload from device
                                </button>
                                <div className="flex gap-2">
                                    <div className="flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 shrink-0">
                                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                                        </svg>
                                        <input
                                            type="text"
                                            value={urlInput}
                                            onChange={(e) => setUrlInput(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddUrl(); } }}
                                            placeholder="Paste image URL..."
                                            className="bg-transparent text-sm text-white/70 placeholder:text-white/25 focus:outline-none w-full"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddUrl}
                                        disabled={!urlInput.trim()}
                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white disabled:opacity-30 transition-all"
                                        style={{background: "linear-gradient(135deg, #8A9A5B, #6b7a46)"}}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Write a message..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#8A9A5B]/50 focus:bg-white/[0.08] transition-all"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={!message.trim() && imageInputs.length === 0}
                        className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all bg-[#8A9A5B] hover:bg-[#728249] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

