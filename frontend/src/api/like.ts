const url = import.meta.env.VITE_API_URL;
export async function create(postId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({postId})
    })
    if(!response.ok) throw new Error(`Failed to like post ${postId}: ${response.status}`);
    return response.json();
}
export async function findAll(){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'like', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) throw new Error(`Failed to load posts likes: ${response.status}`);
    return response.json();
}
export async function findUnique(postId: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'like/post/' + postId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) throw new Error(`Failed to load like from post ${postId}: ${response.status}`)
    return response.json();
}
export async function remove(postId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'like/post/' + postId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) throw new Error(`Failed to delete like from post ${postId}: ${response.status}`);
    return response.json();
}