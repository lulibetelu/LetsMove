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
    if(!response.ok) throw new Error(`Could not get sports`);
    return response.json();
}