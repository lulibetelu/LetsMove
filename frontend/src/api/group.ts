import type {CreateGroup, UpdateGroup} from "../types/groupTypes.ts";
import api, { handleApiError } from "./client.ts";

export async function findUserGroups(){
    try {
        const { data } = await api.get('groups');
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function findOneGroup(groupId: number) {
    try {
        const { data } = await api.get('groups/' + groupId);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function createGroup(group: CreateGroup){
    try {
        const { data } = await api.post('groups', group);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}
export async function removeGroup(groupId: number){
    try {
        const { data } = await api.delete('groups/' + groupId);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}
export async function updateGroup(groupId: number, group: UpdateGroup){
    try {
        const { data } = await api.patch('groups/' + groupId, group);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}