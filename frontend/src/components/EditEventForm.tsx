import {Pencil} from "lucide-react";
import type {EventType, UpdateEventRawData} from "../types/eventTypes.ts";
import {useState} from "react";
import PopUpError from "./PopUpError.tsx";
import {updateEvent} from "../api/event.ts";

interface Props {
    event: EventType
    onClose: () => void;
}


export default function EditEventForm({event, onClose}:Props){
    const [description, setDescription] = useState(event.description);
    const [startingDate ,setStartingDate] = useState(event.startingDate.toString());
    const [location, setLocation] = useState(event.location? event.location.location : "");
    const [endingDate, setEndingDate] = useState(event.endingDate ? event.endingDate.toString() : "");
    const [isPrivate, setIsPrivate] = useState(event.isPrivate);
    const [error, setError] = useState(false);

    const checkData = (data: UpdateEventRawData) => {
        if (data.description.length === 0 || startingDate.length === 0) return false;

        if (event.eventType === "InPerson" && location.length === 0) return false;

        return !(event.eventType === "Asynchronous" && endingDate.length === 0)
    }

    const handleSubmit:React.SubmitEventHandler<HTMLFormElement> = async (eventi) => {
        eventi.preventDefault();
        const data: UpdateEventRawData = {
            id: event.id,
            title: event.title,
            type: event.eventType,
            description: description,
            startingDate: startingDate,
            endingDate: endingDate,
            location: location,
            isPrivate: isPrivate
        }
        if (!checkData(data)) {
            setError(true);
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
            <form
                className="modal-box bg-base-100 p-0 overflow-hidden max-w-lg w-full flex flex-col h-auto max-h-[85vh]"
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

                    {/* Starting Date */}
                    <div>
                        <label className="label">
                    <span className="label-text font-medium">
                        Starting Date
                    </span>
                        </label>

                        <input
                            type="datetime-local"
                            value={startingDate}
                            onChange={(e) => setStartingDate(e.target.value)}
                            className="
                        input input-bordered
                        w-full

                        focus:outline-none
                        focus:border-[#96a55a]
                    "
                        />
                    </div>

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

                            <input
                                type="datetime-local"
                                value={endingDate}
                                onChange={(e) => setEndingDate(e.target.value)}
                                className="
                            input input-bordered
                            w-full

                            focus:outline-none
                            focus:border-[#96a55a]
                        "
                            />

                            <p className="text-xs text-base-content/50 mt-2">
                                Asynchronous events can define an optional ending date.
                            </p>
                        </div>
                    )}
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
                    {error && (
                        <PopUpError message="Failed to update event" />
                    )}
                </div>

            </form>

            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>Cerrar</button>
            </form>
        </dialog>
    )
}