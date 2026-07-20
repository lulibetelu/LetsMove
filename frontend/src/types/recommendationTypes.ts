export interface RecommendationUser {
  id: number;
  username: string;
  birthday: Date;
  location: string;
  preferences: { sport: string; level: string }[];
}

export interface RecommendationEvent {
  id: number;
  host: { username: string };
  title: string;
  startingDate: Date;
  location?: string;
  sport: string;
}

export interface RecommendationExplanation {
  explanation: string;
}
