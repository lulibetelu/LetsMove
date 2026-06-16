import {useEffect, useState} from "react";
import {Search, X, Check, Shield, ShieldOff, Trash2} from "lucide-react";
import {useQueryClient} from "@tanstack/react-query";
import ImagePicker from "../ImagePicker.tsx";
import {useFriends} from "../../hooks/groups/useFriends.ts";
import {removeGroup, updateGroup} from "../../api/group.ts";
import {getCurrentUserId, getUsernameFromId} from "../../api/user.ts";
import type {ImageInput} from "../../types/imageType.ts";
import type {UpdateGroup} from "../../types/groupTypes.ts";

interface Props {
    groupId: number;
    group: {
        id: number;
        name: string;
        description: string;
        imageId: number | null;
        groupMembers: { userId: number; isAdmin: boolean }[];
    };
    onClose: () => void;
    onUpdated: () => void;
    onDeleted: () => void;
}

const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function EditGroup({groupId, group, onClose, onUpdated, onDeleted}: Props) {
    const [name, setName] = useState(group.name);
    const [description, setDescription] = useState(group.description);
    const [images, setImages] = useState<ImageInput[]>(
        group.imageId ? [{url: `${VITE_API_URL}image/${group.imageId}`}] : [],
    );
    const [members, setMembers] = useState<
        { userId: number; username: string; isAdmin: boolean }[]
    >([]);
    const [removedMemberIds, setRemovedMemberIds] = useState<number[]>([]);
    const [selectedFriendIds, setSelectedFriendIds] = useState<number[]>([]);
    const [friendSearch, setFriendSearch] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();
    const currentUserId = getCurrentUserId();
    const {data: friends = [], isLoading: friendsLoading} = useFriends();

    useEffect(() => {
        const fetchMemberNames = async () => {
            const result = await Promise.all(
                group.groupMembers.map(async (m) => ({
                    userId: m.userId,
                    username: (await getUsernameFromId(m.userId)) ?? `User #${m.userId}`,
                    isAdmin: m.isAdmin,
                })),
            );
            setMembers(result);
        };
        fetchMemberNames();
    }, [group.groupMembers]);

    const filteredFriends = friends.filter(
        (f) =>
            !members.some((m) => m.userId === f.id) &&
            f.username.toLowerCase().includes(friendSearch.toLowerCase()),
    );

    const toggleFriend = (id: number) => {
        setSelectedFriendIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    };

    const toggleAdmin = (userId: number) => {
        setMembers((prev) =>
            prev.map((m) =>
                m.userId === userId ? {...m, isAdmin: !m.isAdmin} : m,
            ),
        );
    };

    const markForRemoval = (userId: number) => {
        setMembers((prev) => prev.filter((m) => m.userId !== userId));
        setRemovedMemberIds((prev) => [...prev, userId]);
    };

    const handleSubmit = async () => {
        if (!name.trim()) {
            setError("Group name is required");
            return;
        }
        setIsSubmitting(true);
        setError(null);

        try {
            const updateData: UpdateGroup = {};

            if (name !== group.name) updateData.name = name.trim();
            if (description !== group.description) updateData.description = description.trim();

            if (images[0]?.content) {
                updateData.image = images[0];
            }

            const membersToUpdate = [];

            for (const member of members) {
                const original = group.groupMembers.find(
                    (m) => m.userId === member.userId,
                );
                if (!original || original.isAdmin !== member.isAdmin) {
                    membersToUpdate.push({
                        memberId: member.userId,
                        isAdmin: member.isAdmin,
                    });
                }
            }

            for (const friendId of selectedFriendIds) {
                membersToUpdate.push({memberId: friendId, isAdmin: false});
            }

            if (membersToUpdate.length > 0) updateData.membersToUpdate = membersToUpdate;
            if (removedMemberIds.length > 0) updateData.membersIdToRemove = removedMemberIds;

            await updateGroup(groupId, updateData);
            await queryClient.invalidateQueries({queryKey: ['group', groupId]});
            await queryClient.invalidateQueries({queryKey: ['groups']});
            onUpdated();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update group");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Delete this group? This action cannot be undone.")) return;
        setIsSubmitting(true);
        try {
            await removeGroup(groupId);
            await queryClient.invalidateQueries({queryKey: ['groups']});
            onDeleted();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete group");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <dialog open className="modal modal-open" onClose={onClose}>
            <div className="modal-box max-w-lg bg-[#1e1e1e] border border-white/5 p-0 overflow-hidden">
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
                    <h2 className="text-lg font-bold text-white/90">Edit Group</h2>
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors text-white/30 hover:text-white/60"
                    >
                        <X size={20}/>
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
                        <ImagePicker images={images} onChange={setImages} max={1}/>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 block">
                            Members
                        </label>
                        <div className="space-y-1 mb-4">
                            {members.map((member) => (
                                <div
                                    key={member.userId}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/5"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                                            <span className="text-xs font-semibold text-white/50">
                                                {member.username[0]?.toUpperCase() ?? "?"}
                                            </span>
                                        </div>
                                        <span className="text-sm text-white/80">
                                            {member.username}
                                            {member.userId === currentUserId && (
                                                <span className="text-xs text-white/30 ml-1.5">(you)</span>
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => toggleAdmin(member.userId)}
                                            disabled={member.userId === currentUserId}
                                            className={`p-1.5 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed
                                                ${member.isAdmin
                                                    ? "text-[#8A9A5B] hover:bg-[#8A9A5B]/10"
                                                    : "text-white/30 hover:bg-white/5"
                                            }`}
                                            title={member.isAdmin ? "Demote to member" : "Promote to admin"}
                                        >
                                            {member.isAdmin ? <Shield size={15}/> : <ShieldOff size={15}/>}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => markForRemoval(member.userId)}
                                            disabled={member.userId === currentUserId}
                                            className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                            title="Remove from group"
                                        >
                                            <Trash2 size={15}/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                                    <span className="loading loading-spinner loading-sm text-[#8A9A5B]"/>
                                </div>
                            ) : filteredFriends.length === 0 ? (
                                <p className="text-center text-white/30 text-xs py-6">
                                    {friendSearch ? "No friends match" : "No more friends to add"}
                                </p>
                            ) : (
                                filteredFriends.map((friend) => {
                                    const isSelected = selectedFriendIds.includes(friend.id);
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
                                                {isSelected && <Check size={12} className="text-white"/>}
                                            </div>
                                            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                                <span className="text-xs font-semibold text-white/50">
                                                    {friend.username[0].toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="text-sm text-white/70 truncate">
                                                {friend.username}
                                            </span>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                        {selectedFriendIds.length > 0 && (
                            <p className="text-xs text-[#8A9A5B] mt-2">
                                {selectedFriendIds.length} friend{selectedFriendIds.length > 1 ? "s" : ""} selected
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-between gap-3 px-6 py-4 border-t border-white/5">
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-full text-sm font-semibold text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-all disabled:opacity-40"
                    >
                        Delete Group
                    </button>
                    <div className="flex gap-3">
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
                            disabled={isSubmitting}
                            className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all
                                disabled:opacity-40 disabled:cursor-not-allowed
                                bg-[#8A9A5B] hover:bg-[#728249] active:scale-95"
                        >
                            {isSubmitting ? (
                                <span className="loading loading-spinner loading-sm"/>
                            ) : (
                                "Save"
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}/>
        </dialog>
    );
}
