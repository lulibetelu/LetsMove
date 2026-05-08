const url = import.meta.env.VITE_API_URL;
export async function findAllSports(){
    const token = localStorage.getItem('token')
    const response = await fetch(url + 'sports', {
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