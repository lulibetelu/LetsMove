import { useQuery } from "@tanstack/react-query";
import {
  getUserRecommendations,
  getEventRecommendations,
} from "../../api/recommendation.ts";

export function useUserRecommendations(currentUserId: number | null) {
  return useQuery({
    queryKey: ["recommendations", "users", currentUserId],
    queryFn: getUserRecommendations,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: "always",
  });
}

export function useEventRecommendations(currentUserId: number | null) {
  return useQuery({
    queryKey: ["recommendations", "events", currentUserId],
    queryFn: getEventRecommendations,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: "always",
  });
}
