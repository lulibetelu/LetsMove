import api, { handleApiError } from "./client.ts";

interface SportPreference {
    sport: string;
    level: string;
}

interface CreatePreferencesDto {
    sports: SportPreference[];
}

export async function createPreferences(createPreferencesDto: CreatePreferencesDto){
    try {
        const { data } = await api.post('preferences/create', createPreferencesDto);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}