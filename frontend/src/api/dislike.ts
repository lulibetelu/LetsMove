import type {ActionValidatorResponse} from "../types/actionValidatorResponse.ts";
import api, { handleApiError } from "./client.ts";

export async function createDislike(postId: number): Promise<ActionValidatorResponse>{
    try {
        await api.post("dislike", { postId });
        return { error: false };
    } catch {
        return { error: true };
    }
}

export async function removeDislike(postId: number){
    try {
        const { data } = await api.delete("dislike/post/" + postId);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}