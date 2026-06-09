import type {ActionValidatorResponse} from "../types/actionValidatorResponse.ts";
import api, { handleApiError } from "./client.ts";

export async function createLike(postId: number):Promise<ActionValidatorResponse>{
    try {
        const { data } = await api.post('like', { postId });
        return data;
    } catch (error) {
        handleApiError(error);
    }
}
export async function findAll(){
    try {
        const { data } = await api.get('like');
        return data;
    } catch (error) {
        handleApiError(error);
    }
}
export async function findUnique(postId: number) {
    try {
        const { data } = await api.get('like/post/' + postId);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}
export async function removeLike(postId: number){
    try {
        const { data } = await api.delete('like/post/' + postId);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}