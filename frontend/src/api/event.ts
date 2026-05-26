import type {
    CreateEventType,
    EventFilters,
    EventRawData,
    UpdateEventRawData,
    UpdateEventType
} from "../types/eventTypes.ts";
import {getCurrentUserId} from "./user.ts";

import type {ImageInput} from "../types/imageType.ts";

const url = import.meta.env.VITE_API_URL;


export async function findEvents(page:number, filters:EventFilters){
    const token = localStorage.getItem('token');
    const params = new URLSearchParams({
        page: page.toString(),
        ...(filters.title && { title: filters.title }),
        ...(filters.host && { host: filters.host }),
        ...(filters.sport && { sport: filters.sport }),
    });
    console.log(params.toString())
    const response = await fetch(url + `event/limited?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }
    return response.json();
}

export async function findOneEvent(id: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }

    return response.json();
}

export async function createEvent(data: EventRawData){
    const formattedData: CreateEventType = formatEventData(data);
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formattedData),
    })
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }

    return response.json();
}

function formatEventData(data: EventRawData): CreateEventType {
    if (data.type === "InPerson") {
        return {
            title: data.title,
            description: data.description,
            type: data.type,
            startingDate: new Date(data.startingDate),
            location: data.location,
            isPrivate: data.isPrivate,
            sportName: data.sport
        }
    }

    return {
        title: data.title,
        description: data.description,
        type: data.type,
        startingDate: new Date(data.startingDate),
        endingDate: new Date(data.endingDate),
        isPrivate: data.isPrivate,
        sportName: data.sport
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
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event/${data.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formattedData),
    })
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }

    return response.json();
}

export async function eliminateEvent(id:number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }

    return response.json();
}

export async function joinEvent(eventId: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'event-sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({eventId: eventId}),
    });

    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }

    return response.json();
}

export async function exitEvent(eventId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event-sign-up/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }

    return response.json();
}
export async function acceptParticipant(userId: number, eventId: number){
    const token = localStorage.getItem('token');
    const datos = {
        eventId: eventId,
        state: 'Accepted',
        userId: userId
    }
    const response = await fetch(url + 'event-sign-up', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos),
    });

    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }

    return response.json();
}

export async function rejectParticipant(userId: number, eventId: number){
    const token = localStorage.getItem('token');
    const datos = {
        eventId: eventId,
        state: 'Rejected',
        userId: userId,
    }
    const response = await fetch(url + 'event-sign-up', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos),
    });

    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }

    return response.json();
}

export async function findEventParticipants(eventId: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event-sign-up/event/${eventId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }
    return response.json();
}

export async function findEventsFromHost() {
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event/host`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }
    return response.json();
}

export async function findEventsUserParticipate(page: number, userId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event/participates?page=${page}&id=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }
    return response.json();
}

export async function findOneSignUp(eventId: number) {
    const token = localStorage.getItem('token');
    const user: number|null = getCurrentUserId();
    if (user === null) throw new Error("User not found");
    const response = await fetch(url + `event-sign-up?eventId=${eventId}&userId=${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }
    return response.json();
}
export async function createEventEntry(eventId: number, content: string, images?: ImageInput[]) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'event-entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ eventId, content, images }),
    });
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }
    return response.json();
}

export async function getEntriesFromEvent(eventId: number, page: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event-entry/event/${eventId}?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }
    return response.json();
}

export async function deleteEventEntry(entryId: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event-entry/${entryId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }
    return response.json();
}
