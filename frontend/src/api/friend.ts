import type {FriendRequestType} from "../types/friendRequestType.ts";
import api, { handleApiError } from "./client.ts";

export async function createFriendRequest(receiverId: number){
    try {
        const { data } = await api.post('friends', { receiverId });
        return data;
    } catch (error: any) {
        throw new Error(`Failed to create request to user ${receiverId}: ${error?.response?.status ?? 500}`);
    }
}
export async function findAllFriendRequests(): Promise<FriendRequestType[]>{
    try {
        const { data } = await api.get('friends/requests');
        return data;
    } catch {
        throw new Error('Could not get friend requests');
    }
}

export async function acceptFriendRequest(friendId: number){
    try {
        const { data } = await api.patch('friends', { friendId, state: 'Accepted' });
        return data;
    } catch {
        throw new Error('Could not accept friend request.');
    }
}

export async function rejectFriendRequest(friendId: number){
    try {
        const { data } = await api.patch('friends', { friendId, state: 'Rejected' });
        return data;
    } catch (error: any) {
        throw new Error(`Could not reject friend request. Status: ${error?.response?.status ?? 500}`);
    }
}

export async function findUniqueFriend(receiverId: number) {
    try {
        const { data } = await api.get('friends/requests/' + receiverId);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function findAllFriends() {
    try {
        const { data } = await api.get('friends');
        return data;
    } catch (error) {
        handleApiError(error);
    }
}


export async function removeFriend(receiverId: number){
    try {
        const { data } = await api.delete('friends/requests/' + receiverId);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}