import type {NewPostCredentials} from "../types/postTypes.ts";
import api, { handleApiError } from "./client.ts";

export async function create(postCredentials: NewPostCredentials){
    try {
        const { data } = await api.post('posts', postCredentials);
        return data;
    } catch (error: any) {
        throw new Error(`Failed to create post: ${error?.response?.status ?? 500}`);
    }
}

export async function findAll(page?: number, search?: string){
    const params: Record<string, any> = {};
    if (page) params.page = page;
    if (search) params.search = search;
    try {
        const { data } = await api.get('posts', { params });
        return data;
    } catch (error: any) {
        throw new Error(`Failed to load posts: ${error?.response?.status ?? 500}`);
    }
}

export async function findOne(postId: number){
    try {
        const { data } = await api.get('posts/' + postId);
        return data;
    } catch (error: any) {
        throw new Error(`Failed to load post with id ${postId}: ${error?.response?.status ?? 500}`);
    }
}

export async function removePost(postId: number){
    try {
        const { data } = await api.delete('posts/' + postId);
        return data;
    } catch (error: any) {
        throw new Error(`Failed to delete post with id ${postId}: ${error?.response?.status ?? 500}`);
    }
}

export async function findPostsFromUser(userId: number, page?: number){
    try {
        const { data } = await api.get('posts/user/' + userId, { params: { page: page ?? 1 } });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}