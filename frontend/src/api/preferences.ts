import type {CreatePreferencesDto} from "backend/src/preferences/dto/create.preferences.dto.ts";
import api, { handleApiError } from "./client.ts";

export async function createPreferences(createPreferencesDto: CreatePreferencesDto){
    try {
        const { data } = await api.post('preferences/create', createPreferencesDto);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}