import { useQuery } from "@tanstack/react-query";
import {
  explainUserRecommendation,
  explainEventRecommendation,
} from "../../api/recommendation.ts";

export function useUserExplanation(userId: number, enabled: boolean, currentUserId: number | null) {
  return useQuery({
    queryKey: ["explanation", "user", userId, currentUserId],
    queryFn: () => explainUserRecommendation(userId),
    enabled: enabled && userId !== null,
    staleTime: 10 * 60 * 1000,
  });
}

export function useEventExplanation(eventId: number, enabled: boolean, currentUserId: number | null) {
  return useQuery({
    queryKey: ["explanation", "event", eventId, currentUserId],
    queryFn: () => explainEventRecommendation(eventId),
    enabled: enabled && eventId !== null,
    staleTime: 10 * 60 * 1000,
  });
}
