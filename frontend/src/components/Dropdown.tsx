import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {ChevronDown, X} from "lucide-react";
import PopUpError from "./PopUpError.tsx";

interface Props {
    dataList: string[],
    error: Error | null,
    isPending: boolean,
    value: string | string[],
    handleChange: (value: string | string[]) => void
    multiple?: boolean,
    placeholder?: string
}

export default function Dropdown({dataList, error, isPending, value, handleChange, multiple, placeholder}: Props) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({top: 0, left: 0, width: 0});
    const [highlighted, setHighlighted] = useState(-1);

    const isMulti = multiple === true;
    const selectedValues = isMulti ? (value as string[]) : [];
    const singleValue = isMulti ? "" : (value as string);

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
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setCoords({top: rect.bottom + 4, left: rect.left, width: rect.width});
        }
    };

    const openDropdown = () => {
        recalcCoords();
        setSearch("");
        setHighlighted(-1);
        setOpen(true);
    };

    const toggleOption = (option: string) => {
        const next = selectedValues.includes(option)
            ? selectedValues.filter(v => v !== option)
            : [...selectedValues, option];
        handleChange(next);
        setHighlighted(-1);
        inputRef.current?.focus();
    };

    const selectOption = (option: string) => {
        if (isMulti) {
            toggleOption(option);
        } else {
            handleChange(option);
            setSearch("");
            setHighlighted(-1);
            setOpen(false);
            inputRef.current?.blur();
        }
    };

    const clearValue = () => {
        if (isMulti) {
            handleChange([]);
        } else {
            handleChange("");
        }
        setSearch("");
        setHighlighted(-1);
        inputRef.current?.focus();
    };

    const removeItem = (item: string) => {
        const next = selectedValues.filter(v => v !== item);
        handleChange(next);
        inputRef.current?.focus();
    };

    const hasSelection = isMulti ? selectedValues.length > 0 : !!singleValue;

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
        } else if (e.key === "Backspace" && !search && isMulti && selectedValues.length > 0) {
            removeItem(selectedValues[selectedValues.length - 1]);
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
                {isMulti ? (
                    <div
                        className="input input-bordered bg-white/5 w-full pr-10 min-h-[48px] h-auto py-1.5 flex flex-wrap gap-1.5 items-center cursor-text focus-within:border-[#96a55a]"
                        onClick={() => { if (!open) openDropdown(); }}
                    >
                        {selectedValues.map(v => (
                            <span
                                key={v}
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8A9A5B]/20 text-[#8A9A5B] text-xs font-medium"
                            >
                                {v}
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onMouseDown={(e) => { e.stopPropagation(); removeItem(v); }}
                                    className="hover:text-white transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                        <input
                            ref={inputRef}
                            type="text"
                            value={search}
                            placeholder={selectedValues.length === 0 ? (placeholder || "Select sports") : ""}
                            onFocus={openDropdown}
                            onChange={(e) => {
                                if (!open) openDropdown();
                                setSearch(e.target.value);
                                setHighlighted(-1);
                            }}
                            onKeyDown={handleKeyDown}
                            className="flex-1 min-w-[80px] bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30"
                        />
                    </div>
                ) : (
                    <input
                        ref={inputRef}
                        type="text"
                        value={open ? search : singleValue || ""}
                        placeholder={placeholder || "Choose sport"}
                        onFocus={openDropdown}
                        onChange={(e) => {
                            if (!open) openDropdown();
                            setSearch(e.target.value);
                            setHighlighted(-1);
                        }}
                        onKeyDown={handleKeyDown}
                        readOnly={!open && !!singleValue}
                        className="
                            input input-bordered bg-white/5 w-full pr-10
                            focus:outline-none focus:border-[#96a55a]
                            cursor-pointer
                        "
                    />
                )}

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                    {hasSelection && !open && (
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

            {error && <PopUpError message={error.message} />}

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
                            {filtered.map((option, i) => {
                                const isSelected = isMulti ? selectedValues.includes(option) : singleValue === option;
                                return (
                                    <li
                                        key={option}
                                        onClick={() => selectOption(option)}
                                        onMouseEnter={() => setHighlighted(i)}
                                        className={`
                                            px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center gap-2
                                            ${highlighted === i
                                                ? "bg-white/10 text-white"
                                                : isSelected
                                                    ? "text-[#8A9A5B] font-medium"
                                                    : "text-white/70 hover:bg-white/5"
                                            }
                                        `}
                                    >
                                        {isMulti && (
                                            <span className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                                isSelected ? "bg-[#8A9A5B] border-[#8A9A5B]" : "border-white/20"
                                            }`}>
                                                {isSelected && <span className="text-white text-[10px] font-bold">✓</span>}
                                            </span>
                                        )}
                                        {option}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>,
                document.body
            )}
        </div>
    );
}
