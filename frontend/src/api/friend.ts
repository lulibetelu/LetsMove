const url = import.meta.env.VITE_API_URL;
export async function createFriendRequest(friendId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'friends', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({friendId})
    })
    return {error: !response.ok};
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

export async function findUniqueFriend(userId: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'friends/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) throw new Error(`Failed to load friend from ${userId}: ${response.status}`)
    return response.json();
}

export async function removeFriend(userId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'friends/' + userId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) throw new Error(`Failed to delete friend from ${userId}: ${response.status}`)
    return response.json();
}