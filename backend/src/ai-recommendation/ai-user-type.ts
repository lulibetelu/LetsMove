export interface AiUserType {
  age: number;
  location: string;
  interests: Interests[];
}

export interface AiEventType {
  sport: string;
  location?: string;
  description: string;
  eventType: string;
}

interface Interests {
  sport: string;
  level: string;
}

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
