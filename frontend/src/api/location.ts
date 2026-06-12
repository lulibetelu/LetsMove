import type {LocationType} from "../types/fileTypes.ts";
import api, { handleApiError } from "./client.ts";

interface LocationListResponse {
    locations: LocationType[];
}

export async function findAllLocations(): Promise<LocationType[]> {
    try {
        const { data } = await api.get<LocationListResponse>('location');
        return data.locations;
    } catch (error) {
        handleApiError(error);
    }
}

export async function searchLocations(query: string): Promise<LocationType[]> {
    try {
        const { data } = await api.get<LocationListResponse>('location/search', {
            params: { q: query },
        });
        return data.locations;
    } catch (error) {
        handleApiError(error);
    }
}
