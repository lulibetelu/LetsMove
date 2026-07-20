import { useState } from "react";
import { CalendarDays, MapPin, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import type { RecommendationEvent } from "../../types/recommendationTypes.ts";
import { useEventExplanation } from "../../hooks/recommendations/useExplanation.ts";
import { formatDate } from "../../resusable-functions/formatDate.ts";

interface Props {
  event: RecommendationEvent;
}

export default function EventRecommendationCard({ event }: Props) {
  const [showExplanation, setShowExplanation] = useState(false);
  const { data: explanation, isLoading } = useEventExplanation(
    event.id,
    showExplanation,
  );

  return (
    <div className="bg-[#1e1e1e] rounded-xl border border-white/10 p-3 hover:border-white/20 transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#8A9A5B]/20 flex items-center justify-center shrink-0">
          <CalendarDays size={16} className="text-[#8A9A5B]" />
        </div>

        <div className="flex-1 min-w-0">
          <Link
            to={`/event/${event.id}`}
            className="text-sm font-semibold text-white/90 hover:text-[#8A9A5B] transition-colors line-clamp-2 block"
          >
            {event.title}
          </Link>

          <div className="flex flex-col gap-0.5 mt-1">
            <p className="flex items-center gap-1 text-xs text-white/40">
              <CalendarDays size={10} className="shrink-0" />
              {formatDate(event.startingDate)}
            </p>
            {event.location && (
              <p className="flex items-center gap-1 text-xs text-white/40">
                <MapPin size={10} className="shrink-0" />
                <span className="truncate">{event.location}</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-medium text-white/80 bg-[#8A9A5B]/20 border border-[#8A9A5B]/30"
            >
              {event.sport}
            </span>
            <span className="text-[10px] text-white/30">
              by {event.host.username}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowExplanation(!showExplanation)}
        className="mt-2 w-full flex items-center justify-center gap-1.5 text-[11px] text-white/30 hover:text-[#8A9A5B] transition-colors py-1"
      >
        <Sparkles size={11} />
        <span>Why am I seeing this?</span>
        {showExplanation ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
      </button>

      {showExplanation && (
        <div className="mt-1 px-2 py-2 bg-white/5 rounded-lg">
          {isLoading ? (
            <div className="flex justify-center py-1">
              <span className="loading loading-spinner loading-xs text-[#8A9A5B]"></span>
            </div>
          ) : (
            <p className="text-[11px] text-white/50 leading-relaxed">
              {explanation?.explanation ?? "No explanation available."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
