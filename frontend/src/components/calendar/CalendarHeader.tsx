import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
];

interface CalendarHeaderProps {
    currentDate: Date;
    onPrevious: () => void;
    onNext: () => void;
}

export default function CalendarHeader({ currentDate, onPrevious, onNext }: CalendarHeaderProps) {
    return (
        <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Calendar size={20} className="text-[#8A9A5B]" />
                <h2 className="text-lg font-semibold text-white">
                    <span className="text-[#8A9A5B]">{MONTHS[currentDate.getMonth()]}</span>
                    <span className="text-white/50 mx-1.5">·</span>
                    <span className="text-white/70">{currentDate.getFullYear()}</span>
                </h2>
            </div>
            <div className="flex gap-1">
                <button
                    onClick={onPrevious}
                    className="btn btn-sm btn-ghost text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    onClick={onNext}
                    className="btn btn-sm btn-ghost text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}