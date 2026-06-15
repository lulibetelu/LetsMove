import type {Location} from "../types/locationTypes.ts";
import api, { handleApiError } from "./client.ts";



export async function findAllLocations(): Promise<Location[]> {
    try {
        const { data } = await api.get<Location[]>('location');
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function searchLocations(query: string): Promise<Location[]> {
    try {
        const { data } = await api.get<Location[]>('location/search', {
            params: { q: query },
        });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}
