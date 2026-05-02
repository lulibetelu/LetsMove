const url = import.meta.env.VITE_API_URL;


export async function findEvents(page:number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event/limited?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) throw new Error(`Failed to fetch events: ${response.status}`);

    return response.json();
}