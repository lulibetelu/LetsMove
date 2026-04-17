const url = import.meta.env.VITE_API_URL;
export async function createFriendRequest(receiverId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'friends', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({friendId: receiverId})
    })
    if (!response.ok) throw new Error();
    return response.json();
}
export async function findAllFriends(){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'friends', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) throw new Error(`Failed to load friends: ${response.status}`);
    return response.json();
}

export async function findUniqueFriend(receiverId: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'friends/' + receiverId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) throw new Error(`Failed to load friend from ${receiverId}: ${response.status}`)
    return response.json();
}

export async function removeFriend(receiverId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'friends/' + receiverId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) throw new Error(`Failed to delete friend from ${receiverId}: ${response.status}`)
    return response.json();
}