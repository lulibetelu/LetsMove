import type {Sport} from "../types/sportType.ts";

export function sportsToString(sportList: Sport[] | undefined): string[]{
    if (sportList === undefined) return []
    return sportList?.map(sport => sport.name)
}