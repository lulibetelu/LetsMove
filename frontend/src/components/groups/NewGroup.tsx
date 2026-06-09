import { useState } from "react";
import { Search, X, Check } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import ImagePicker from "../ImagePicker.tsx";
import { useFriends } from "../../hooks/groups/useFriends.ts";
import { createGroup } from "../../api/group.ts";
import { getCurrentUserId } from "../../api/user.ts";
import type { ImageInput } from "../../types/imageType.ts";
import type { CreateGroup } from "../../types/groupTypes.ts";

interface NewGroupProps {
    onClose: () => void;
    onGroupCreated: () => void;
}

export default function NewGroup({ onClose, onGroupCreated }: NewGroupProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<ImageInput[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [friendSearch, setFriendSearch] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();
    const currentUserId = getCurrentUserId();
    const { data: friends = [], isLoading: friendsLoading } = useFriends();

    const filteredFriends = friends.filter((f) =>
        f.username.toLowerCase().includes(friendSearch.toLowerCase()),
    );

    const toggleFriend = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    };

    const handleSubmit = async () => {
        if (!name.trim()) {
            setError("Group name is required");
            return;
        }
        if (!currentUserId) {
            setError("You must be logged in");
            return;
        }
        setIsSubmitting(true);
        setError(null);
        try {
            const members = [
                { memberId: currentUserId, isAdmin: true },
                ...selectedIds.map((id) => ({ memberId: id, isAdmin: false })),
            ];
            const data: CreateGroup = {
                name: name.trim(),
                description: description.trim(),
                members,
                ...(images[0] ? { image: images[0] } : {}),
            };
            await createGroup(data);
            await queryClient.invalidateQueries({queryKey: ['groups']});
            onGroupCreated();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create group");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <dialog open className="modal modal-open" onCancel={(e) => { e.preventDefault(); onClose(); }} onClose={onClose}>
            <div className="modal-box max-w-lg bg-[#1e1e1e] border border-white/5 p-0 overflow-hidden">
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
                    <h2 className="text-lg font-bold text-white/90">New Group</h2>
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors text-white/30 hover:text-white/60"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                    {error && (
                        <div className="px-4 py-2.5 rounded-lg bg-red-400/10 border border-red-400/20">
                            <p className="text-xs text-red-400">{error}</p>
                        </div>
                    )}

                    <div>
                        <label className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 block">
                            Group name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter group name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm
                                placeholder:text-white/30 focus:outline-none focus:border-[#8A9A5B]/50 focus:bg-white/[0.08] transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 block">
                            Description
                        </label>
                        <textarea
                            placeholder="Describe the group..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm
                                placeholder:text-white/30 focus:outline-none focus:border-[#8A9A5B]/50 focus:bg-white/[0.08] transition-all resize-none"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 block">
                            Group photo
                        </label>
                        <ImagePicker images={images} onChange={setImages} />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 block">
                            Add members
                        </label>
                        <div className="relative mb-3">
                            <Search
                                size={14}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                            />
                            <input
                                type="text"
                                placeholder="Search friends..."
                                value={friendSearch}
                                onChange={(e) => setFriendSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm
                                    placeholder:text-white/30 focus:outline-none focus:border-[#8A9A5B]/50 focus:bg-white/[0.08] transition-all"
                            />
                        </div>
                        <div className="max-h-48 overflow-y-auto space-y-1 border border-white/5 rounded-lg p-1">
                            {friendsLoading ? (
                                <div className="flex justify-center py-6">
                                    <span className="loading loading-spinner loading-sm text-[#8A9A5B]" />
                                </div>
                            ) : filteredFriends.length === 0 ? (
                                <p className="text-center text-white/30 text-xs py-6">
                                    {friendSearch ? "No friends match" : "No friends yet"}
                                </p>
                            ) : (
                                filteredFriends.map((friend) => {
                                    const isSelected = selectedIds.includes(friend.id);
                                    return (
                                        <button
                                            key={friend.id}
                                            type="button"
                                            onClick={() => toggleFriend(friend.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left
                                                ${isSelected
                                                    ? "bg-[#8A9A5B]/10 border border-[#8A9A5B]/30"
                                                    : "hover:bg-white/5 border border-transparent"
                                                }`}
                                        >
                                            <div
                                                className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all
                                                    ${isSelected
                                                        ? "bg-[#8A9A5B] border-[#8A9A5B]"
                                                        : "border-white/20"
                                                    }`}
                                            >
                                                {isSelected && <Check size={12} className="text-white" />}
                                            </div>
                                            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                                <span className="text-xs font-semibold text-white/50">
                                                    {friend.username[0].toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="text-sm text-white/70 truncate">
                                                {friend.username}
                                            </span>
                                            <span className="ml-auto text-[10px] text-white/20">
                                                ID: {friend.id}
                                            </span>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                        {selectedIds.length > 0 && (
                            <p className="text-xs text-[#8A9A5B] mt-2">
                                {selectedIds.length} friend{selectedIds.length > 1 ? "s" : ""} selected
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 rounded-full text-sm text-white/50 hover:text-white/70 hover:bg-white/5 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !name.trim()}
                        className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all
                            disabled:opacity-40 disabled:cursor-not-allowed
                            bg-[#8A9A5B] hover:bg-[#728249] active:scale-95"
                    >
                        {isSubmitting ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            "Create"
                        )}
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose} />
        </dialog>
    );
}
