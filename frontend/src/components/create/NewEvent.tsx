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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    onClose: () => void;
    onEventCreated?: (id: number) => void;
}

export default function NewEvent(props: Props){
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [startingDate, setStartingDate] = useState<Date | null>(null);
    const [endingDate, setEndingDate] = useState<Date | null>(null);
    const [location, setLocation] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [sport, setSport] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string>("");
    const {sports, isPending, sportError} = useSports();

    const [images, setImages] = useState<ImageInput[]>([])

    const checkData = (data:EventRawData) => {
        if (!title || !description || !type || !startingDate || !sport) {
            setValidationError("Please fill in all required fields");
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

        if (data.type === "InPerson" && !location) {
            setValidationError("Location is required for in-person events");
            return false;
        }

        if (data.type === "Asynchronous" && !data.endingDate && isPrivate) {
            setValidationError("Ending date is required for private asynchronous events");
            return false;
        }

        return true;
    }

    const handleSportChange = (sport: string) => {
        setSport(sport);
    }


    const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setValidationError("");
        const data: EventRawData = {
            title: title,
            description: description,
            type: type,
            startingDate: startingDate ? startingDate.toISOString() : "",
            endingDate: endingDate ? endingDate.toISOString() : "",
            location: location,
            isPrivate: isPrivate,
            sport: sport,
            images: images,
        }
        if (!checkData(data)) {
            return;
        }

        try {
            const created = await createEvent(data);
            props.onEventCreated?.(created.id);
            props.onClose();
        }catch {
            setError("Failed to create event. Check your connection and try again.");
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

                {/* Date / Starting Date */}
                <div>
                    <label className="label">
                    <span className="label-text font-medium">
                        {type === "Asynchronous" ? "Starting Date" : "Date"}
                    </span>
                    </label>

                    <DatePicker
                        selected={startingDate}
                        onChange={(date: Date | null) => setStartingDate(date)}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeFormat="h:mm aa"
                        timeIntervals={15}
                        minDate={new Date()}
                        placeholderText="Select starting date and time"
                        className="input input-bordered w-full"
                        wrapperClassName="w-full"
                    />
                </div>

                {/* Ending Date */}
                {type === "Asynchronous" && (<div>
                    <label className="label">
                    <span className="label-text font-medium">
                        Ending Date (optional)
                    </span>
                    </label>

                    <DatePicker
                        selected={endingDate}
                        onChange={(date: Date | null) => setEndingDate(date)}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeFormat="h:mm aa"
                        timeIntervals={15}
                        minDate={startingDate ?? new Date()}
                        isClearable
                        placeholderText="No end date"
                        className="input input-bordered w-full"
                        wrapperClassName="w-full"
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

                {/* Images */}
                <div>
                    <label className="label">
                        <span className="label-text font-medium">Cover Image</span>
                    </label>
                    <ImagePicker images={images} onChange={setImages} max={1} forcedDescription="Cover"/>
                </div>

                {/* Error */}
                <div>
                    {validationError && <PopUpError message={validationError} />}
                    {error && !validationError && <PopUpError message={error} />}
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

        </form>

        <form method="dialog" className="modal-backdrop">
            <button onClick={props.onClose}>Cerrar</button>
        </form>
    </dialog>
)
}