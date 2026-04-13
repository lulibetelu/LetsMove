import type {NewPostCredentials} from "../types/postTypes.ts";

const url = import.meta.env.VITE_API_URL;

export async function create(postCredentials: NewPostCredentials){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'posts' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postCredentials)
    });
    if (!response.ok) throw new Error(`Failed to create post: ${response.status}`);
    return response.json();
}

export async function findAll(cursor?: number){
    const token = localStorage.getItem('token');
    const completeUrl = cursor? url + 'posts?cursor=' + cursor : url + 'posts';
    const response = await fetch( completeUrl , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error(`Failed to load posts: ${response.status}`);
    return response.json();
}

export async function findOne(postId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'posts/' + postId , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error(`Failed to load post with id ${postId}: ${response.status}`);
    return response.json();
}

export async function remove(postId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'posts/' + postId , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error(`Failed to delete post with id ${postId}: ${response.status}`);
    return response.json();
}