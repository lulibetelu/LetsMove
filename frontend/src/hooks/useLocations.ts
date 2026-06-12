import {useQuery} from "@tanstack/react-query";
import {findAllLocations} from "../api/location.ts";
import type {LocationType} from "../types/fileTypes.ts";

export function useLocations(){
    const {isPending, error, data} = useQuery<LocationType[]>({
        queryKey: ["locations"],
        queryFn: findAllLocations,
        staleTime: 24 * 60 * 60 * 1000,
    });

    return {isPending, locationError: error, locations: data ?? []}
}
