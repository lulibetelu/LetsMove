import {CalendarDays} from "lucide-react";
import {useState} from "react";
import PopUpError from "./PopUpError.tsx";

interface Props {
    onClose: () => void;
    onEventCreated: () => void
}

interface EventRawData {
    title: string | undefined,
    description: string | undefined,
    type: string | undefined,
    startingDate: string,
    endingDate: string,
    location: string | undefined
}

export default function NewEvent(props: Props){
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [type, setType] = useState<string>();
    const [startingDate, setStartingDate] = useState("");
    const [endingDate, setEndingDate] = useState("");
    const [location, setLocation] = useState<string>();
    const [error, setError] = useState<boolean>();

    const checkData = (data:EventRawData) => {
        if (!data.title || !data.description || !data.type || !data.startingDate) return false;

        if (data.type === "InPerson" && !data.location) return false;

        return !(data.type === "Asynchronous" && !endingDate);


    }


    const handleSubmit = () => {
        const data: EventRawData = {
            title: title,
            description: description,
            type: type,
            startingDate: startingDate,
            endingDate: endingDate,
            location: location
        }
        if (!checkData(data)) {
            setError(true);
            return;
        }

        try {
            createEvent(data)
        }catch {
            setError(true);
        }
        //TODO agregar el create que formatee la rawdata en algo que le sirva al back
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
                        <CalendarDays size={24} strokeWidth={1.8} />
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-lg">Create Event</h2>
                    <p className="text-sm text-base-content/60">
                        Organize something for the community
                    </p>
                </div>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-4 flex flex-col gap-4">

                {/* Title */}
                <div>
                    <label className="label">
                        <span className="label-text font-medium">Title</span>
                    </label>

                    <input
                        type="text"
                        name="title"
                        placeholder="Football match at the park..."
                        className="input input-bordered w-full focus:outline-none focus:border-[#96a55a]"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="label">
                        <span className="label-text font-medium">Description</span>
                    </label>

                    <textarea
                        name="description"
                        placeholder="Describe your event..."
                        className="textarea textarea-bordered w-full min-h-[120px] focus:outline-none focus:border-[#96a55a]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Event Type */}
                <div>
                    <label className="label">
                    <span className="label-text font-medium">
                        Event Type
                    </span>
                    </label>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setType("InPerson")}
                            className={`flex-1 btn rounded-xl border-none ${
                                type === "InPerson"
                                    ? "bg-[#96a55a] hover:bg-[#7f8d4c] text-white"
                                    : "bg-base-200 text-base-content/70 hover:bg-base-300"
                            }`}
                        >
                            In Person
                        </button>

                        <button
                            type="button"
                            onClick={() => setType("Asynchronous")}
                            className={`flex-1 btn rounded-xl border-none ${
                                type === "Asynchronous"
                                    ? "bg-[#96a55a] hover:bg-[#7f8d4c] text-white"
                                    : "bg-base-200 text-base-content/70 hover:bg-base-300"
                            }`}
                        >
                            Asynchronous
                        </button>
                    </div>
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
                        className="input input-bordered w-full focus:outline-none focus:border-[#96a55a]"
                        value={startingDate}
                        onChange={(e) => setStartingDate(e.target.value)}
                    />
                </div>

                {/* Ending Date */}
                {type === "Asynchronous" && (<div>
                    <label className="label">
                    <span className="label-text font-medium">
                        Ending Date (optional)
                    </span>
                    </label>

                    <input
                        type="datetime-local"
                        className="input input-bordered w-full focus:outline-none focus:border-[#96a55a]"
                        value={endingDate}
                        onChange={(e) => setEndingDate(e.target.value)}
                    />
                </div>)}

                {/* Location ONLY for InPerson */}
                {type === "InPerson" && (
                    <div>
                        <label className="label">
                        <span className="label-text font-medium">
                            Location
                        </span>
                        </label>

                        <input
                            type="text"
                            placeholder="Sports center, park, gym..."
                            className="input input-bordered w-full focus:outline-none focus:border-[#96a55a]"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                )}

                {/* Async Info */}
                {type === "Asynchronous" && (
                    <div className="bg-[#96a55a]/10 border border-[#96a55a]/20 rounded-xl p-3 text-sm text-base-content/70">
                        Participants will be able to complete this event remotely
                        and asynchronously.
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center w-full p-4 border-t border-base-200 bg-base-50 mt-auto">

                <button
                    type="button"
                    onClick={props.onClose}
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
                    rounded-full
                    px-6
                    border-none

                    transition-all duration-300
                    hover:scale-105
                    active:scale-95
                "
                >
                    Create Event
                </button>
            </div>

            {/* Error */}
            <div>
                {error && <PopUpError message="Failed to create event" />}
            </div>
        </form>

        <form method="dialog" className="modal-backdrop">
            <button onClick={props.onClose}>Cerrar</button>
        </form>
    </dialog>
)
}