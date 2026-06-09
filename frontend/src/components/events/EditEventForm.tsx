import {Pencil} from "lucide-react";
import type {EventType, UpdateEventRawData} from "../../types/eventTypes.ts";
import {useState} from "react";
import PopUpError from "../PopUpError.tsx";
import {updateEvent} from "../../api/event.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    event: EventType
    onClose: () => void;
}


export default function EditEventForm({event, onClose}:Props){
    const [description, setDescription] = useState(event.description);
    const [startingDate ,setStartingDate] = useState<Date>(new Date(event.startingDate));
    const [location, setLocation] = useState(event.location? event.location.location : "");
    const [endingDate, setEndingDate] = useState<Date | null>(
        event.endingDate ? new Date(event.endingDate) : null
    );
    const [isPrivate, setIsPrivate] = useState(event.isPrivate);
    const [error, setError] = useState(false);
    const [validationError, setValidationError] = useState("");

    const checkData = (data: UpdateEventRawData) => {
        if (!data.description) {
            setValidationError("Description is required");
            return false;
        }

        if (startingDate <= new Date()) {
            setValidationError("Starting date must be in the future");
            return false;
        }

        if (data.endingDate && new Date(data.endingDate) <= startingDate) {
            setValidationError("Ending date must be after the starting date");
            return false;
        }

        if (event.eventType === "InPerson" && !location) {
            setValidationError("Location is required for in-person events");
            return false;
        }

        if (event.eventType === "Asynchronous" && !data.endingDate) {
            setValidationError("Ending date is required for asynchronous events");
            return false;
        }

        return true;
    }

    const handleSubmit:React.SubmitEventHandler<HTMLFormElement> = async (eventi) => {
        eventi.preventDefault();
        setValidationError("");
        const data: UpdateEventRawData = {
            id: event.id,
            title: event.title,
            type: event.eventType,
            description: description,
            startingDate: startingDate.toISOString(),
            endingDate: endingDate ? endingDate.toISOString() : undefined,
            location: location,
            isPrivate: isPrivate
        }
        if (!checkData(data)) {
            return;
        }
        try {
            await updateEvent(data);
            onClose();
        }catch {
            setError(true);
            return;
        }
    }

    return (
        <dialog className="modal modal-open backdrop-blur-sm">
            <style>{`
                .react-datepicker {
                    background-color: #1e1e1e;
                    border-color: #333;
                    color: #e0e0e0;
                    font-family: inherit;
                }
                .react-datepicker__header {
                    background-color: #2a2a2a;
                    border-bottom-color: #333;
                }
                .react-datepicker__current-month,
                .react-datepicker__day-name {
                    color: #e0e0e0;
                }
                .react-datepicker__day {
                    color: #ccc;
                }
                .react-datepicker__day:hover {
                    background-color: #8A9A5B;
                    color: #fff;
                }
                .react-datepicker__day--selected,
                .react-datepicker__day--keyboard-selected {
                    background-color: #8A9A5B;
                    color: #fff;
                }
                .react-datepicker__day--disabled {
                    color: #555;
                }
                .react-datepicker__time-container {
                    border-left-color: #333;
                }
                .react-datepicker__time-container .react-datepicker__time {
                    background-color: #1e1e1e;
                }
                .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item {
                    color: #ccc;
                }
                .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item:hover {
                    background-color: #8A9A5B;
                    color: #fff;
                }
                .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
                    background-color: #8A9A5B;
                    color: #fff;
                }
                .react-datepicker__triangle {
                    display: none;
                }
                .react-datepicker-popper .react-datepicker__navigation {
                    top: 12px;
                }
                .react-datepicker__navigation-icon::before {
                    border-color: #8A9A5B;
                }
                .react-datepicker__input-container input {
                    cursor: pointer;
                }
            `}</style>
            <form
                className="modal-box bg-[#141414] p-0 overflow-hidden max-w-lg w-full flex flex-col h-auto max-h-[85vh]"
                onSubmit={handleSubmit}
            >

                {/* Header */}
                <div className="p-4 flex gap-4 items-center border-b border-base-200">
                    <div className="avatar placeholder">
                        <div className="w-12 h-12 rounded-full bg-[#96a55a]/20 text-[#96a55a] flex items-center justify-center">
                            <Pencil size={22} strokeWidth={1.8} />
                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg">Edit Event</h2>
                        <p className="text-sm text-base-content/60">
                            Update your event information
                        </p>
                    </div>
                </div>

                {/* Body */}
                <div className="overflow-y-auto p-4 flex flex-col gap-4">

                    {/* Title (disabled) */}
                    <div>
                        <label className="label">
                    <span className="label-text font-medium">
                        Event Title
                    </span>
                        </label>

                        <input
                            type="text"
                            value={event.title}
                            disabled
                            className="
                        input input-bordered w-full
                        bg-base-200
                        text-base-content/50
                        cursor-not-allowed
                    "
                        />
                    </div>

                    {/* Type (disabled) */}
                    <div>
                        <label className="label">
                    <span className="label-text font-medium">
                        Event Type
                    </span>
                        </label>

                        <input
                            type="text"
                            value={event.eventType}
                            disabled
                            className="
                        input input-bordered w-full
                        bg-base-200
                        text-base-content/50
                        cursor-not-allowed
                    "
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="label">
                    <span className="label-text font-medium">
                        Description
                    </span>
                        </label>

                        <textarea
                            className="
                        textarea textarea-bordered
                        w-full min-h-[120px]

                        focus:outline-none
                        focus:border-[#96a55a]
                    "
                            placeholder="Update your event description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Date / Starting Date */}
                    <div>
                        <label className="label">
                    <span className="label-text font-medium">
                        {event.eventType === "Asynchronous" ? "Starting Date" : "Date"}
                    </span>
                        </label>

                        <DatePicker
                            selected={startingDate}
                            onChange={(date: Date | null) => date && setStartingDate(date)}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeFormat="h:mm aa"
                            timeIntervals={15}
                            minDate={new Date()}
                            className="input input-bordered w-full"
                            wrapperClassName="w-full"
                        />
                    </div>

                    {/* In Person Location */}
                    {event.eventType === "InPerson" && (
                        <div>
                            <label className="label">
                        <span className="label-text font-medium">
                            Location
                        </span>
                            </label>

                            <input
                                type="text"
                                placeholder="Sports center, park, gym..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="
                            input input-bordered
                            w-full

                            focus:outline-none
                            focus:border-[#96a55a]
                        "
                            />
                        </div>
                    )}

                    {/* Async Ending Date */}
                    {event.eventType === "Asynchronous" && (
                        <div>
                            <label className="label">
                        <span className="label-text font-medium">
                            Ending Date
                        </span>
                            </label>

                            <DatePicker
                                selected={endingDate}
                                onChange={(date: Date | null) => setEndingDate(date)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeFormat="h:mm aa"
                                timeIntervals={15}
                                minDate={startingDate}
                                isClearable
                                placeholderText="No end date"
                                className="input input-bordered w-full"
                                wrapperClassName="w-full"
                            />

                            <p className="text-xs text-base-content/50 mt-2">
                                Asynchronous events can define an optional ending date.
                            </p>
                        </div>
                    )}

                    {/* Access */}
                    <div>
                        <label className="label">
                    <span className="label-text font-medium">
                        Access
                    </span>
                        </label>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setIsPrivate(false)}
                                className={`flex-1 btn rounded-xl border-none ${
                                    !isPrivate
                                        ? "bg-[#96a55a] hover:bg-[#7f8d4c] text-white"
                                        : "bg-base-200 text-base-content/70 hover:bg-base-300"
                                }`}
                            >
                                Public
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsPrivate(true)}
                                className={`flex-1 btn rounded-xl border-none ${
                                    isPrivate
                                        ? "bg-[#96a55a] hover:bg-[#7f8d4c] text-white"
                                        : "bg-base-200 text-base-content/70 hover:bg-base-300"
                                }`}
                            >
                                Private
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center w-full p-4 border-t border-base-200 bg-base-50 mt-auto">

                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-ghost rounded-full"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="
                    btn
                    bg-[#96a55a]
                    hover:bg-[#7f8d4c]

                    text-white
                    border-none
                    rounded-full
                    px-6

                    transition-all duration-300

                    hover:scale-105
                    active:scale-95
                "
                    >
                        Save Changes
                    </button>
                </div>

                {/* Error */}
                <div>
                    {validationError && <PopUpError message={validationError} />}
                    {error && !validationError && <PopUpError message="Failed to update event" />}
                </div>

            </form>

            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>Cerrar</button>
            </form>
        </dialog>
    )
}