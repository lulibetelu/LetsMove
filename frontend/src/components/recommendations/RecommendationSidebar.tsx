import { Sparkles } from "lucide-react";
import {
  useUserRecommendations,
  useEventRecommendations,
} from "../../hooks/recommendations/useRecommendations.ts";
import UserRecommendationCard from "./UserRecommendationCard.tsx";
import EventRecommendationCard from "./EventRecommendationCard.tsx";
import {getCurrentUserId} from "../../api/user.ts";
import {useNavigate} from "react-router-dom";

function SkeletonCard() {
  return (
    <div className="bg-[#1e1e1e] rounded-xl border border-white/10 p-3 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-white/5" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-white/5 rounded w-2/3" />
          <div className="h-2 bg-white/5 rounded w-1/2" />
          <div className="flex gap-1 mt-2">
            <div className="h-4 bg-white/5 rounded-full w-12" />
            <div className="h-4 bg-white/5 rounded-full w-14" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecommendationSidebar() {
  const currentUserId = getCurrentUserId();
  const navigate = useNavigate()
  if (currentUserId == null) navigate("/login")
  const { data: users, isLoading: loadingUsers } = useUserRecommendations(currentUserId);
  const { data: events, isLoading: loadingEvents } = useEventRecommendations(currentUserId);

  const hasUsers = users && users.length > 0;
  const hasEvents = events && events.length > 0;
  const isEmpty = !loadingUsers && !loadingEvents && !hasUsers && !hasEvents;

  return (
    <aside className="hidden lg:block w-72 shrink-0 sticky top-0 h-screen overflow-y-auto py-6 px-4 border-l border-white/5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={14} className="text-[#8A9A5B]" />
        <h2 className="text-xs font-semibold tracking-widest uppercase text-white/50">
          Suggested for you
        </h2>
      </div>

      {(loadingUsers || loadingEvents) && (
        <div className="flex flex-col gap-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {!loadingUsers && hasUsers && (
        <div className="flex flex-col gap-3 mb-4">
          {users!.map((user) => (
            <UserRecommendationCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {!loadingEvents && hasEvents && (
        <div className="flex flex-col gap-3">
          {events!.map((event) => (
            <EventRecommendationCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {isEmpty && (
        <div className="text-center py-8">
          <p className="text-xs text-white/30">
            No recommendations available yet.
          </p>
          <p className="text-[10px] text-white/20 mt-1">
            Add more interests to get personalized suggestions.
          </p>
        </div>
      )}
    </aside>
  );
}
