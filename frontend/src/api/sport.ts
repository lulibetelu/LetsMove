import type {SportListObject} from "../types/sportType.ts";
import api, { handleApiError } from "./client.ts";

export async function findAllSports(): Promise<SportListObject> {
    try {
        const { data } = await api.get('sports');
        return data;
    } catch (error) {
        handleApiError(error);
    }
}