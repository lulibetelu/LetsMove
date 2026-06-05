import {CalendarDays} from "lucide-react";
import {useState} from "react";
import PopUpError from "../PopUpError.tsx";
import {createEvent} from "../../api/event.ts";
import type {EventRawData} from "../../types/eventTypes.ts";
import Dropdown from "../Dropdown.tsx";
import {useSports} from "../../hooks/useSports.ts";
import {sportsToString} from "../../resusable-functions/sportFunctions.ts";
import type {ImageInput} from "../../types/imageType.ts";
import ImagePicker from "../ImagePicker.tsx";

interface Props {
    onClose: () => void;
    onEventCreated?: (id: number) => void;
}

export default function NewEvent(props: Props){
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [startingDate, setStartingDate] = useState("");
    const [endingDate, setEndingDate] = useState("");
    const [location, setLocation] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [sport, setSport] = useState<string>("");
    const [error, setError] = useState<boolean>();
    const {sports, isPending, sportError} = useSports();

    const [images, setImages] = useState<ImageInput[]>([])

    const checkData = (data:EventRawData) => {
        if (title.length === 0 || description.length === 0 || type.length === 0 || startingDate.length === 0 || sport.length === 0) return false;

        if (data.type === "InPerson" && location.length === 0) return false;

        return !(data.type === "Asynchronous" && endingDate.length === 0 && isPrivate);
    }

    const handleSportChange = (sport: string) => {
        setSport(sport);
    }


    const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const data: EventRawData = {
            title: title,
            description: description,
            type: type,
            startingDate: startingDate,
            endingDate: endingDate,
            location: location,
            isPrivate: isPrivate,
            sport: sport,
            images: images,
        }
        if (!checkData(data)) {
            setError(true);
            return;
        }

        try {
            const created = await createEvent(data);
            props.onEventCreated?.(created.id);
        }catch {
            setError(true);
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

                <Dropdown dataList={sportsToString(sports)} error={sportError} isPending={isPending} value={sport} handleChange={handleSportChange}/>

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

                {/* Images */}
                <div>
                    <label className="label">
                        <span className="label-text font-medium">Images</span>
                    </label>
                    <ImagePicker images={images} onChange={setImages} allowDescription={true}/>
                </div>
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
                ">
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