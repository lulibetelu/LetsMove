import type {CreateComment} from "../types/commentTypes.ts";
import api, { handleApiError } from "./client.ts";

export async function createComment(commentData: CreateComment) {
    try {
        const { data } = await api.post('comment', commentData);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function findAllComments(postId: number){
    try {
        const { data } = await api.get('comment/' + postId);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function eliminateCommentApi(commentId: number){
    try {
        const { data } = await api.delete('comment/' + commentId);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}