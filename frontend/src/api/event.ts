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
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }

    return response.json();
}

export async function findOneEvent(id: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event/${id}`, {
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

export async function joinEvent(eventId: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'event-sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({eventId: eventId}),
    });

    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }

    return response.json();
}

export async function exitEvent(eventId: number){
    const token = localStorage.getItem('token');
    const response = await fetch(url + `event-sign-up/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }

    return response.json();
}
export async function acceptParticipant(userId: number, eventId: number){
    const token = localStorage.getItem('token');
    const datos = {
        eventId: eventId,
        state: 'Accepted',
        userId: userId,
    }
    const response = await fetch(url + 'event-sign-up', {
        method: 'UPDATE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos),
    });

    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }

    return response.json();
}

export async function rejectParticipant(userId: number, eventId: number){
    const token = localStorage.getItem('token');
    const datos = {
        eventId: eventId,
        state: 'Rejected',
        userId: userId,
    }
    const response = await fetch(url + 'event-sign-up', {
        method: 'UPDATE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos),
    });

    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }

    return response.json();
}