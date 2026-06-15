import { Plus, Search } from "lucide-react";
import GroupCard from "./GroupCard.tsx";

interface GroupListProps {
    groups: {
        id: number;
        name: string;
        description: string;
        imageId: number | null;
    }[];
    selectedGroupId: number | null;
    onSelectGroup: (id: number) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    isLoading: boolean;
    onCreateGroup?: () => void;
}

export default function GroupList({
    groups,
    selectedGroupId,
    onSelectGroup,
    searchQuery,
    onSearchChange,
    isLoading,
    onCreateGroup,
}: GroupListProps) {
    return (
        <>
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white/90">Groups</h2>
                <button
                    type="button"
                    aria-label="Create group"
                    onClick={onCreateGroup}
                    className="w-8 h-8 rounded-full bg-[#96a55a] hover:bg-[#a8b96a] text-white flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 hover:rotate-90 active:scale-95 cursor-pointer"
                >
                    <Plus size={16} />
                </button>
            </div>

            <div className="px-4 py-3">
                <div className="relative">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                    />
                    <input
                        type="text"
                        placeholder="Search groups..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm
                            placeholder:text-white/30
                            focus:outline-none focus:border-[#8A9A5B]/50 focus:bg-white/[0.08] transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <span className="loading loading-spinner loading-md text-[#8A9A5B]" />
                    </div>
                ) : groups.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <p className="text-white/30 text-sm">
                            {searchQuery
                                ? "No groups match your search"
                                : "You don't have any groups yet"}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {groups.map((group) => (
                            <GroupCard
                                key={group.id}
                                group={group}
                                isSelected={selectedGroupId === group.id}
                                onClick={() => onSelectGroup(group.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
