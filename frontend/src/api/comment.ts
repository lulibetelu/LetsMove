import type {CreateComment} from "../types/commentTypes.ts";

const url = import.meta.env.VITE_API_URL;

export async function createComment(commentData: CreateComment) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'comment',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(commentData)
    });
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }
    return response.json();
}

export async function findAllComments(postId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'comment/' + postId,{
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

export async function eliminateCommentApi(commentId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'comment/' + commentId,{
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