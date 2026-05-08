import type {EventType} from "../types/eventTypes.ts";
interface Props  {
    event : EventType;
}

export default function Event(props: Props) {


    return (
        <div>

            {/* Event Card */}
            <div
                key={props.event.id}
                className="bg-base-100 rounded-2xl overflow-hidden border border-base-content/5 shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
            >
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-[#7d8c4a] to-[#96a55a]" />

                <div className="p-5 flex flex-col gap-3">

                    {/* Badge + spots */}
                    <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#7d8c4a]/10 text-[#96a55a] border border-[#7d8c4a]/20">
            {props.event.eventType}
          </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-base-content tracking-tight leading-snug">
                        {props.event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-base-content/50 leading-relaxed line-clamp-2">
                        {props.event.description}
                    </p>

                    {/* Divider + Action */}
                    <div className="flex items-center justify-between pt-3 border-t border-base-content/5">
          <span className="text-xs text-base-content/30">
            Host #{props.event.hostId}
          </span>
                        <button className="px-5 py-2 rounded-xl bg-[#7d8c4a] hover:bg-[#96a55a] active:scale-95 text-white text-sm font-bold transition-all duration-150 shadow-md hover:shadow-[#7d8c4a]/30">
                            Join
                        </button>
                    </div>

                </div>
            </div>

        </div>


    );
}
