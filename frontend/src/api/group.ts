import type {CreateGroup, UpdateGroup} from "../types/groupTypes.ts";

const url = import.meta.env.VITE_API_URL;

export async function findUserGroups(){
    const token = localStorage.getItem('token');
    const response = await fetch(url + `groups`, {
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

export async function findOneGroup(groupId: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + `groups/${groupId}`, {
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

export async function createGroup(group: CreateGroup){
    const token = localStorage.getItem('token');
    const response = await fetch(url + `groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(group)
    })
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }
    return response.json();
}
export async function removeGroup(groupId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + `groups/${groupId}`, {
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
export async function updateGroup(groupId: number, group: UpdateGroup){
    const token = localStorage.getItem('token');
    const response = await fetch(url + `groups/${groupId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(group)
    })
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }
    return response.json();
}