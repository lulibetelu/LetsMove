import type {Sport} from "./sportType.ts";

export interface Preference{
    id: number;
    sportId: number;
    level: string | null;
    sport: Sport;
}