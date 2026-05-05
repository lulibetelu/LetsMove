import type {ActionValidatorResponse} from "../types/actionValidatorResponse.ts";

const url = import.meta.env.VITE_API_URL;

export async function createDislike(postId: number): Promise<ActionValidatorResponse>{
    const token = localStorage.getItem('token');
    const response =  await fetch(url + "dislike", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({postId}),
    });

    return {error: !response.ok}
}

export async function removeDislike(postId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + "dislike/post/" + postId,{
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