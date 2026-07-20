import { useQuery } from "@tanstack/react-query";
import {
  getUserRecommendations,
  getEventRecommendations,
} from "../../api/recommendation.ts";

export function useUserRecommendations() {
  return useQuery({
    queryKey: ["recommendations", "users"],
    queryFn: getUserRecommendations,
    staleTime: 5 * 60 * 1000,
  });
}

export function useEventRecommendations() {
  return useQuery({
    queryKey: ["recommendations", "events"],
    queryFn: getEventRecommendations,
    staleTime: 5 * 60 * 1000,
  });
}
