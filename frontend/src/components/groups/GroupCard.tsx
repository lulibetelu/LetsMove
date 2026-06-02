import { Users } from "lucide-react";

interface GroupCardProps {
    group: {
        id: number;
        name: string;
        description: string;
        imageId: number | null;
    };
    isSelected: boolean;
    onClick: () => void;
}

const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function GroupCard({ group, isSelected, onClick }: GroupCardProps) {
    const imageUrl = group.imageId ? `${VITE_API_URL}image/${group.imageId}` : null;

    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 text-left
                ${isSelected
                    ? "bg-white/10 border-l-2 border-[#8A9A5B]"
                    : "hover:bg-white/5 border-l-2 border-transparent"
                }`}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={group.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                />
            ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8A9A5B] to-[#6b7a46] flex items-center justify-center shrink-0">
                    <Users size={18} className="text-white/80" />
                </div>
            )}

            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white/90 truncate">
                    {group.name}
                </h3>
                <p className="text-xs text-white/40 truncate mt-0.5">
                    {group.description}
                </p>
            </div>
        </button>
    );
}
