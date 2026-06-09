import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {ChevronDown, X} from "lucide-react";

interface Props {
    dataList: string[],
    error: Error | null,
    isPending: boolean,
    value: string,
    handleChange: (sport: string) => void
}

export default function Dropdown({dataList, error, isPending, value, handleChange}: Props) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({top: 0, left: 0, width: 0});
    const [highlighted, setHighlighted] = useState(-1);

    const filtered = dataList.filter(name =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popoverRef.current?.contains(e.target as Node)) return;
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const recalcCoords = () => {
        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            setCoords({top: rect.bottom + 4, left: rect.left, width: rect.width});
        }
    };

    const openDropdown = () => {
        recalcCoords();
        setSearch("");
        setHighlighted(-1);
        setOpen(true);
    };

    const selectOption = (option: string) => {
        handleChange(option);
        setSearch("");
        setHighlighted(-1);
        setOpen(false);
        inputRef.current?.blur();
    };

    const clearValue = () => {
        handleChange("");
        setSearch("");
        setHighlighted(-1);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!open) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlighted(prev => Math.min(prev + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlighted(prev => Math.max(prev - 1, 0));
        } else if (e.key === "Enter" && highlighted >= 0) {
            e.preventDefault();
            selectOption(filtered[highlighted]);
        }
    };

    useEffect(() => {
        if (highlighted >= 0 && listRef.current) {
            const item = listRef.current.children[highlighted] as HTMLElement;
            item?.scrollIntoView({block: "nearest"});
        }
    }, [highlighted]);

    useEffect(() => {
        if (open) recalcCoords();
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handleScroll = (e: Event) => {
            if (listRef.current && listRef.current.contains(e.target as Node)) return;
            setOpen(false);
        };
        document.addEventListener("scroll", handleScroll, {capture: true, passive: true});
        return () => document.removeEventListener("scroll", handleScroll, {capture: true});
    }, [open]);

    return (
        <div ref={containerRef} className="relative w-full">

            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={open ? search : value || ""}
                    placeholder="Choose sport"
                    onFocus={openDropdown}
                    onChange={(e) => {
                        if (!open) openDropdown();
                        setSearch(e.target.value);
                        setHighlighted(-1);
                    }}
                    onKeyDown={handleKeyDown}
                    readOnly={!open && !!value}
                    className="
                        input input-bordered w-full pr-10
                        focus:outline-none focus:border-[#96a55a]
                        cursor-pointer
                    "
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                    {value && !open && (
                        <button
                            type="button"
                            tabIndex={-1}
                            onMouseDown={(e) => { e.stopPropagation(); clearValue(); }}
                            className="pointer-events-auto text-white/30 hover:text-white/60 transition-colors"
                        >
                            <X size={14}/>
                        </button>
                    )}
                    <ChevronDown
                        size={16}
                        className={`text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {isPending && (
                <div className="text-xs text-white/40 mt-2">Loading sports...</div>
            )}

            {error && (
                <p className="text-xs text-red-400/80 mt-2 font-medium">{error.message}</p>
            )}

            {!isPending && dataList.length === 0 && !error && (
                <div className="text-xs text-white/40 mt-2">No sports available</div>
            )}

            {open && !isPending && createPortal(
                <div
                    ref={popoverRef}
                    className="fixed z-[9999] rounded-xl border border-white/10 bg-[#1e1e1e] shadow-xl overflow-hidden"
                    style={{top: coords.top, left: coords.left, width: coords.width}}
                >
                    {filtered.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-white/40">
                            No sports found
                        </div>
                    ) : (
                        <ul ref={listRef} className="max-h-48 overflow-y-auto py-1">
                            {filtered.map((option, i) => (
                                <li
                                    key={option}
                                    onClick={() => selectOption(option)}
                                    onMouseEnter={() => setHighlighted(i)}
                                    className={`
                                        px-4 py-2.5 text-sm cursor-pointer transition-colors
                                        ${highlighted === i
                                            ? "bg-white/10 text-white"
                                            : value === option
                                                ? "text-[#8A9A5B] font-medium"
                                                : "text-white/70 hover:bg-white/5"
                                        }
                                    `}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>,
                document.body
            )}
        </div>
    );
}
