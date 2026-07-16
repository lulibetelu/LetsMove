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
