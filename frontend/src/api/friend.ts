import type {FriendRequestType} from "../types/friendRequestType.ts";

const url = import.meta.env.VITE_API_URL;
export async function createFriendRequest(receiverId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'friends', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({receiverId})
    })
    if (!response.ok) throw new Error(`Failed to create request to user ${receiverId}: ${response.status}`);
    return response.json();
}
export async function findAllFriendRequests(): Promise<FriendRequestType[]>{
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'friends/requests/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error('Could not get friend requests');
    return response.json();
}

export async function acceptFriendRequest(friendId: number){
    const token = localStorage.getItem('token');
    const datos = {
        friendId: friendId,
        state: 'Accepted'
    }
    const response = await fetch(url + 'friends',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos),
    });
    if (!response.ok) throw new Error('Could not accept friend request.')
    return response.json();
}

export async function rejectFriendRequest(friendId: number){
    const token = localStorage.getItem('token');
    const datos = {
        friendId: friendId,
        state: 'Rejected'
    }
    const response = await fetch(url + 'friends',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos),
    });
    if (!response.ok) throw new Error(`Could not reject friend request. Status: ${response.status}`)
    return response.json();
}

export async function findUniqueFriend(receiverId: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'friends/requests/' + receiverId, {
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

export async function removeFriend(receiverId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'friends/requests/' + receiverId, {
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