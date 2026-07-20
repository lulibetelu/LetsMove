import { useState } from "react";
import { MapPin, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import type { RecommendationUser } from "../../types/recommendationTypes.ts";
import { useUserExplanation } from "../../hooks/recommendations/useExplanation.ts";

const levelColors: Record<string, string> = {
  beginner: "#8A9A5B",
  intermediate: "#B8962E",
  expert: "#A0522D",
};

interface Props {
  user: RecommendationUser;
}

export default function UserRecommendationCard({ user }: Props) {
  const [showExplanation, setShowExplanation] = useState(false);
  const { data: explanation, isLoading } = useUserExplanation(
    user.id,
    showExplanation,
  );

  return (
    <div className="bg-[#1e1e1e] rounded-xl border border-white/10 p-3 hover:border-white/20 transition-all duration-200">
      <div className="flex items-start gap-3">
        <Link to={`/profile/${user.id}`} className="shrink-0">
          <div className="w-9 h-9 rounded-full bg-[#8A9A5B]/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-[#8A9A5B]">
              {user.username[0].toUpperCase()}
            </span>
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          <Link
            to={`/profile/${user.id}`}
            className="text-sm font-semibold text-white/90 hover:text-[#8A9A5B] transition-colors truncate block"
          >
            {user.username}
          </Link>

          {user.location && (
            <p className="flex items-center gap-1 text-xs text-white/40 mt-0.5">
              <MapPin size={10} className="shrink-0" />
              <span className="truncate">{user.location}</span>
            </p>
          )}

          {user.preferences.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {user.preferences.slice(0, 3).map((pref) => (
                <span
                  key={pref.sport}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium text-white/80"
                  style={{
                    backgroundColor: `${levelColors[pref.level] ?? "#8A9A5B"}30`,
                    border: `1px solid ${levelColors[pref.level] ?? "#8A9A5B"}50`,
                  }}
                >
                  {pref.sport}
                </span>
              ))}
            </div>
          )}
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
