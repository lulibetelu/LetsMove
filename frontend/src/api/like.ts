import type {ActionValidatorResponse} from "../types/actionValidatorResponse.ts";

const url = import.meta.env.VITE_API_URL;
export async function createLike(postId: number):Promise<ActionValidatorResponse>{
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({postId})
    })
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }
    return response.json();
}
export async function findAll(){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'like', {
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
export async function findUnique(postId: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'like/post/' + postId, {
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
export async function removeLike(postId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'like/post/' + postId, {
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