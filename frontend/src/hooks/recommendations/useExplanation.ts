import { useQuery } from "@tanstack/react-query";
import {
  explainUserRecommendation,
  explainEventRecommendation,
} from "../../api/recommendation.ts";

export function useUserExplanation(userId: number | null, enabled: boolean) {
  return useQuery({
    queryKey: ["explanation", "user", userId],
    queryFn: () => explainUserRecommendation(userId!),
    enabled: enabled && userId !== null,
    staleTime: 10 * 60 * 1000,
  });
}

export function useEventExplanation(eventId: number | null, enabled: boolean) {
  return useQuery({
    queryKey: ["explanation", "event", eventId],
    queryFn: () => explainEventRecommendation(eventId!),
    enabled: enabled && eventId !== null,
    staleTime: 10 * 60 * 1000,
  });
}
