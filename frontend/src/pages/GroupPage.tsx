import { useState } from "react";
import Sidebar from "../components/Sidebar.tsx";
import GroupList from "../components/groups/GroupList.tsx";
import GroupDetail from "../components/groups/GroupDetail.tsx";
import NewGroup from "../components/groups/NewGroup.tsx";
import { useGroups } from "../hooks/groups/useGroups.ts";

export default function GroupPage() {
    const { data: groups, isLoading, isError } = useGroups();
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);

    const filteredGroups = (groups ?? []).filter((g: { name: string }) =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (isError) {
        return (
            <div className="min-h-screen bg-[#141414] flex">
                <Sidebar />
                <div className="flex-1 ml-60 flex items-center justify-center">
                    <p className="text-white/40 text-sm">Could not load groups</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar />

            <div className="flex-1 ml-60 flex">
                <div className="w-96 shrink-0 border-r border-white/5 flex flex-col bg-[#1e1e1e]">
                    <GroupList
                        groups={filteredGroups}
                        selectedGroupId={selectedGroupId}
                        onSelectGroup={setSelectedGroupId}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        isLoading={isLoading}
                    />
                </div>

                <div className="flex-1 flex flex-col">
                    {selectedGroupId ? (
                        <GroupDetail groupId={selectedGroupId} />
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        className="text-white/20"
                                    >
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <p className="text-white/30 text-sm">Select a group</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <button
                type="button"
                onClick={() => setShowCreateForm(true)}
                className="
                    fixed bottom-6 right-6
                    w-16 h-16
                    rounded-full
                    bg-[#96a55a]
                    hover:bg-[#a8b96a]
                    text-white
                    text-4xl
                    flex items-center justify-center
                    shadow-lg
                    hover:shadow-2xl
                    transition-all duration-300 ease-out
                    hover:scale-110
                    hover:rotate-90
                    active:scale-95
                    cursor-pointer
                "
            >
                +
            </button>

            {showCreateForm && (
                <NewGroup
                    onClose={() => setShowCreateForm(false)}
                    onGroupCreated={() => setShowCreateForm(false)}
                />
            )}
        </div>
    );
}
