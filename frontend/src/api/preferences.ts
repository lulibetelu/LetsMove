import type {CreatePreferencesDto} from "backend/src/preferences/dto/create.preferences.dto.ts";
const url = import.meta.env.VITE_API_URL;

export async function createPreferences(createPreferencesDto: CreatePreferencesDto){
    const token = localStorage.getItem('token');
    const response = await fetch(url + 'preferences/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(createPreferencesDto)
    });
    if (!response.ok) {
        const message = await response.json();
        if (Array.isArray(message.message)) throw new Error(message.message[0]);
        else throw new Error(message.message);
    }
    return response.json();
}