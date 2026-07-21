import api, {handleApiError} from "./client.ts";

export async function getNotificationSettings(): Promise<{ notificationsEnabled: boolean }> {
    try {
        const { data } = await api.get('notification/isEnabled');
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function toggleNotificationSettings(): Promise<{ notificationsEnabled: boolean }> {
    try {
        const { data } = await api.patch('notification/toggle');
        return data;
    } catch (error) {
        handleApiError(error);
    }
}
