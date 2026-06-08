import { useEffect, useState } from "react";
import { Shield, Users } from "lucide-react";
import useGroup from "../../hooks/groups/useGroup.ts";
import { getUsernameFromId, getCurrentUserId } from "../../api/user.ts";

interface GroupDetailProps {
    groupId: number;
}

const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function GroupDetail({ groupId }: GroupDetailProps) {
    const { data: group, isLoading, isError } = useGroup(groupId);
    const [memberNames, setMemberNames] = useState<Record<number, string>>({});
    const currentUserId = getCurrentUserId();

    useEffect(() => {
        if (!group?.groupMembers) return;

        const fetchNames = async () => {
            const names: Record<number, string> = {};
            await Promise.all(
                group.groupMembers.map(async (member: { userId: number; isAdmin: boolean }) => {
                    const name = await getUsernameFromId(member.userId);
                    if (name) names[member.userId] = name;
                }),
            );
            setMemberNames(names);
        };

        fetchNames();
    }, [group?.groupMembers]);

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <span className="loading loading-spinner loading-md text-[#8A9A5B]" />
            </div>
        );
    }

    if (isError || !group) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-white/30 text-sm">Could not load group</p>
            </div>
        );
    }

    const imageUrl = group.imageId ? `${VITE_API_URL}image/${group.imageId}` : null;
    const isCurrentUserAdmin = group.groupMembers?.some(
        (m: { userId: number; isAdmin: boolean }) => m.userId === currentUserId && m.isAdmin,
    );

    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="relative h-48 shrink-0">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={group.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#8A9A5B] to-[#6b7a46] flex items-center justify-center">
                        <Users size={48} className="text-white/20" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
                <div className="absolute bottom-4 left-6">
                    <h1 className="text-2xl font-bold text-white">{group.name}</h1>
                    {isCurrentUserAdmin && (
                        <div className="flex items-center gap-1.5 mt-1">
                            <Shield size={14} className="text-[#8A9A5B]" />
                            <span className="text-xs font-medium text-[#8A9A5B]">Admin</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
                        About
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                        {group.description}
                    </p>
                </div>

                <div>
                    <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
                        Members ({group.groupMembers?.length ?? 0})
                    </h3>
                    <div className="space-y-1">
                        {group.groupMembers?.map(
                            (member: { userId: number; isAdmin: boolean }) => (
                                <div
                                    key={member.userId}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <span className="text-sm font-semibold text-white/60">
                                                {(memberNames[member.userId]?.[0] ?? "?").toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-sm text-white/80">
                                                {memberNames[member.userId] ?? `User #${member.userId}`}
                                            </span>
                                            {member.userId === currentUserId && (
                                                <span className="text-xs text-white/30 ml-1.5">(you)</span>
                                            )}
                                        </div>
                                    </div>
                                    {member.isAdmin && (
                                        <Shield size={14} className="text-[#8A9A5B] shrink-0" />
                                    )}
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
