import type {CreateEventType, EventRawData, UpdateEventRawData, UpdateEventType} from "../types/eventTypes.ts";

const url = import.meta.env.VITE_API_URL;


export async function findEvents(page:number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event/limited?page=${page}`, {
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
            location: data.location
        }
    }

    return {
        title: data.title,
        description: data.description,
        type: data.type,
        startingDate: new Date(data.startingDate),
        endingDate: new Date(data.endingDate)
    }
}

function formatUpdateEventData(data: UpdateEventRawData): UpdateEventType {
    if (data.type === "InPerson") {
        return {
            description: data.description,
            startingDate: new Date(data.startingDate),
            location: data.location
        }
    }

    return {
        description: data.description,
        startingDate: new Date(data.startingDate),
        endingDate: new Date(data.endingDate!)
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