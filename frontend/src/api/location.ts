import type {LocationType} from "../types/fileTypes.ts";
import api, { handleApiError } from "./client.ts";



export async function findAllLocations(): Promise<LocationType[]> {
    try {
        const { data } = await api.get<LocationType[]>('location');
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function searchLocations(query: string): Promise<LocationType[]> {
    try {
        const { data } = await api.get<LocationType[]>('location/search', {
            params: { q: query },
        });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}
