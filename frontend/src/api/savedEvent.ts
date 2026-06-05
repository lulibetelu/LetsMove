import api from "./client.ts";
import {handleApiError} from "./client.ts";

export async function saveEvent(eventId: number) {
    try {
        const { data } = await api.post('saved-event', { eventId });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function unsaveEvent(eventId: number) {
    try {
        const { data } = await api.delete(`saved-event/${eventId}`);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function findSavedEvents(): Promise<{ eventId: number }[]> {
    try {
        const { data } = await api.get('saved-event');
        return data;
    } catch (error) {
        handleApiError(error);
    }
}
