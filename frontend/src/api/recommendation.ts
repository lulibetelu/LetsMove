import api from "./client.ts";
import type {
  RecommendationUser,
  RecommendationEvent,
  RecommendationExplanation,
} from "../types/recommendationTypes.ts";

export async function getUserRecommendations(): Promise<RecommendationUser[]> {
  const { data } = await api.get("recommendation/user");
  return data;
}

export async function getEventRecommendations(): Promise<RecommendationEvent[]> {
  const { data } = await api.get("recommendation/event");
  return data;
}

export async function explainUserRecommendation(
  userId: number,
): Promise<RecommendationExplanation> {
  const { data } = await api.get(`recommendation/user/explain/${userId}`);
  return data;
}

export async function explainEventRecommendation(
  eventId: number,
): Promise<RecommendationExplanation> {
  const { data } = await api.get(`recommendation/event/explain/${eventId}`);
  return data;
}
