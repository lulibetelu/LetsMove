import type {
    CreateEventType,
    EventFilters,
    EventRawData,
    UpdateEventRawData,
    UpdateEventType
} from "../types/eventTypes.ts";
import {getCurrentUserId} from "./user.ts";

import type {ImageInput} from "../types/imageType.ts";
import api, { handleApiError } from "./client.ts";

export async function findFeed(page: number) {
    try {
        const { data } = await api.get('event/feed', { params: { page: page.toString() } });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function findEvents(page:number, filters:EventFilters){
    const params = {
        page: page.toString(),
        ...(filters.title && { title: filters.title }),
        ...(filters.host && { host: filters.host }),
        ...(filters.sport && { sport: filters.sport }),
    };
    try {
        const { data } = await api.get('event/limited', { params });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function findOneEvent(id: number) {
    try {
        const { data } = await api.get('event/' + id);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function createEvent(data: EventRawData){
    const formattedData: CreateEventType = formatEventData(data);
    try {
        const result = await api.post('event', formattedData);
        return result.data;
    } catch (error) {
        handleApiError(error);
    }
}

function formatEventData(data: EventRawData): CreateEventType {
    const coverImage = data.images?.[0];
    if (data.type === "InPerson") {
        return {
            title: data.title,
            description: data.description,
            type: data.type,
            startingDate: new Date(data.startingDate),
            location: data.location,
            isPrivate: data.isPrivate,
            sportName: data.sport,
            coverImage,
        }
    }

    return {
        title: data.title,
        description: data.description,
        type: data.type,
        startingDate: new Date(data.startingDate),
        endingDate: new Date(data.endingDate),
        isPrivate: data.isPrivate,
        sportName: data.sport,
        coverImage,
    }
}

function formatUpdateEventData(data: UpdateEventRawData): UpdateEventType {
    if (data.type === "InPerson") {
        return {
            description: data.description,
            startingDate: new Date(data.startingDate),
            location: data.location,
            isPrivate: data.isPrivate
        }
    }

    return {
        description: data.description,
        startingDate: new Date(data.startingDate),
        endingDate: new Date(data.endingDate!),
        isPrivate: data.isPrivate
    }
}

export async function updateEvent(data: UpdateEventRawData){
    const formattedData: UpdateEventType = formatUpdateEventData(data);
    try {
        const result = await api.patch('event/' + data.id, formattedData);
        return result.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function eliminateEvent(id:number){
    try {
        const { data } = await api.delete('event/' + id);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function joinEvent(eventId: number) {
    try {
        const { data } = await api.post('event-sign-up', { eventId });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function exitEvent(eventId: number){
    try {
        const { data } = await api.delete('event-sign-up/' + eventId);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}
export async function acceptParticipant(userId: number, eventId: number){
    try {
        const { data } = await api.patch('event-sign-up', {
            eventId,
            state: 'Accepted',
            userId,
        });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function rejectParticipant(userId: number, eventId: number){
    try {
        const { data } = await api.patch('event-sign-up', {
            eventId,
            state: 'Rejected',
            userId,
        });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function findEventParticipants(eventId: number) {
    try {
        const { data } = await api.get('event-sign-up/event/' + eventId);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function findEventsFromHost() {
    try {
        const { data } = await api.get('event/host');
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function findEventsUserParticipate(page: number, userId: number){
    try {
        const { data } = await api.get('event/participates', { params: { page, id: userId } });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function findOneSignUp(eventId: number) {
    const user: number|null = getCurrentUserId();
    if (user === null) throw new Error("User not found");
    try {
        const { data } = await api.get('event-sign-up', { params: { eventId, userId: user } });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}
export async function createEventEntry(eventId: number, content: string, images?: ImageInput[]) {
    try {
        const { data } = await api.post('event-entry', { eventId, content, images });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getEntriesFromEvent(eventId: number, page: number) {
    try {
        const { data } = await api.get('event-entry/event/' + eventId, { params: { page } });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function deleteEventEntry(entryId: number) {
    try {
        const { data } = await api.delete('event-entry/' + entryId);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function addGalleryImage(eventId: number, image: ImageInput) {
    try {
        const { data } = await api.post(`event/${eventId}/gallery`, image);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getGalleryImages(eventId: number) {
    try {
        const { data } = await api.get(`event/${eventId}/gallery`);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}
