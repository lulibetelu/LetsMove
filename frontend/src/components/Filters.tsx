import PopUpError from "./PopUpError.tsx";
import {useState} from "react";
import Dropdown from "./Dropdown.tsx";
import {sportsToString} from "../resusable-functions/sportFunctions.ts";
import {useSports} from "../hooks/useSports.ts";
import type {EventFilters, FormFilters} from "../types/eventTypes.ts";

interface Props {
    onClose: () => void,
    onSubmit    : (hostAndSport: {host:string, sport:string}) => void,
    filters: EventFilters
}

export default function Filters(props: Props) {
    const [hostFilter, setHostFilter] = useState<string>(props.filters.host);
    const [sportFilter, setSportFiler] = useState<string>(props.filters.sport)
    const [savedFilter, setSavedFiler] = useState<boolean|undefined>(props.filters.saved? true: undefined)
    const [joinedFilter, setJoinedFilter] = useState<boolean|undefined>(props.filters.joined? true: undefined)
    const {sports, sportError, isPending} = useSports();
    const showClearFilter = hostFilter.length !== 0 || sportFilter.length !== 0 || savedFilter !== undefined || joinedFilter !== undefined

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        const submitFilters: FormFilters = {
            host: hostFilter,
            sport: sportFilter,
            saved: savedFilter,
            joined: joinedFilter
        }
        props.onSubmit(submitFilters)
        props.onClose()
    }

    const clearFilters = () => {
        setHostFilter("")
        setSportFiler("")
        setSavedFiler(undefined)
        setJoinedFilter(undefined)
        props.onSubmit({host: "", sport: ""})
        props.onClose()
    }


    return (
        <dialog className="modal modal-open backdrop-blur-sm">
            <form
                className="modal-box bg-[#141414] p-0 overflow-hidden max-w-lg w-full flex flex-col h-auto max-h-[80vh]"
                onSubmit={(e) => {handleSubmit(e)
                }}>
                <div className="overflow-y-auto p-4 flex flex-col gap-4">
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Host</span>
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Type a username..."
                            className="input input-bordered w-full focus:outline-none focus:border-[#96a55a]"
                            value={hostFilter}
                            onChange={(e) => setHostFilter(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Sport</span>
                        </label>
                        <Dropdown dataList={sportsToString(sports)} error={sportError} isPending={isPending}
                                  value={sportFilter} handleChange={(newSport) => setSportFiler(newSport)}/>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Saved</span>
                            <button type="button" onClick={() => setSavedFiler(prev => prev? undefined: true)}>
                                {savedFilter? <GreenRightToggle/> : <ToggleLeftIcon/>}
                            </button>
                        </label>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Joined</span>
                            <button type="button" onClick={() => setJoinedFilter(prev => prev? undefined: true)}>
                                {joinedFilter? <GreenRightToggle/> : <ToggleLeftIcon/>}
                            </button>
                        </label>
                    </div>
                    {showClearFilter &&  <button
                        type="button"
                        onClick={clearFilters}
                        className="btn btn-ghost rounded-full"
                    >
                        Clear Filters
                    </button>}
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
                        Filter
                    </button>
                </div>

                {/* Error */}
                <div>
                    {sportError && <PopUpError message="Failed to create event" />}
                </div>
            </form>

            <form method="dialog" className="modal-backdrop">
                <button onClick={props.onClose}>Cerrar</button>
            </form>
        </dialog>
    );
}

function ToggleLeftIcon() {
    return (
        <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
            <rect x="0.5" y="0.5" width="35" height="19" rx="9.5" fill="#333" stroke="#555"/>
            <circle cx="10" cy="10" r="7" fill="#666"/>
        </svg>
    );
}

function GreenRightToggle() {
    return (
        <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
            <rect x="0.5" y="0.5" width="35" height="19" rx="9.5" fill="#96a55a" stroke="#96a55a"/>
            <circle cx="26" cy="10" r="7" fill="white"/>
        </svg>
    );
}