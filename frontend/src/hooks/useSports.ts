import {useQuery} from "@tanstack/react-query";
import {findAllSports} from "../api/sport.ts";
import type {SportListObject} from "../types/sportType.ts";

export function useSports(){
    const {isPending, error, data} = useQuery<SportListObject>({
        queryKey: ["sports"],
        queryFn: findAllSports
    });
    const sportError = error;
    const sports = data ? data.sports : [];

    return {isPending, sportError, sports}
}