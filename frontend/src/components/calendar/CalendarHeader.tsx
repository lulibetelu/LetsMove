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
        <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-1">
                <button onClick={onPrevious} className="btn btn-sm btn-ghost text-white/60 hover:text-white">
                    ‹
                </button>
                <button onClick={onNext} className="btn btn-sm btn-ghost text-white/60 hover:text-white">
                    ›
                </button>
            </div>
        </div>
    );
}