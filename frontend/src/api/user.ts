import type {LoginCredentials, RegisterCredentials, User} from "../types/userTypes.ts";
import api, { handleApiError } from "./client.ts";

interface LoginResponse{
    access_token: string
}

export async function createUser(credentials: RegisterCredentials){
    try {
        const body: Record<string, unknown> = {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
        };
        if (credentials.locationId) {
            body.locationId = credentials.locationId;
        }
        const { data } = await api.post('register', body);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function loginUser(credentials: LoginCredentials){
    try {
        const { data } = await api.post<LoginResponse>('login', credentials);
        return data.access_token;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getUsernameFromId(id?: number): Promise<string | null> {
    if (!id) {
        return decodeToken()?.username ?? null;
    }
    else {
        try {
            const { data } = await api.get<User>('register/' + id);
            return data.username;
        } catch (error) {
            handleApiError(error);
        }
    }
}
export function getCurrentUserId(): number|null {
    return decodeToken()?.sub ?? null;
}

function decodeToken(): { sub: number; username: string } | null {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;
        const base64url = token.split('.')[1];
        const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        const sub = Number(payload.sub);
        if (isNaN(sub)) return null;
        return { sub, username: payload.username ?? null };
    } catch {
        return null;
    }
}

