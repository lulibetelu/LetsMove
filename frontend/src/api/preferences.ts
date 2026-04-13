import type {CreatePreferencesDto} from "backend/dist/src/preferences/dto/create.preferences.dto.ts";
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
    if (!response.ok) throw new Error(`Failed to create preference: ${response.status}`);
    return response.json();
}