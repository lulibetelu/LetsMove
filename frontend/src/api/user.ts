import type {LoginCredentials, RegisterCredentials, User, UserProfile} from "../types/userTypes.ts";
import api, { handleApiError } from "./client.ts";

interface LoginResponse{
    access_token: string
}

interface GoogleAuthResponse {
    exists: boolean;
    access_token?: string;
    email?: string;
    name?: string;
}

export async function createUser(credentials: RegisterCredentials){
    try {
        const body: Record<string, unknown> = {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
        };
        if (credentials.birthday) {
            body.birthday = credentials.birthday;
        }
        if (credentials.locationId) {
            body.locationId = credentials.locationId;
        }
        if (credentials.isGoogleUser !== undefined) {
            body.isGoogleUser = credentials.isGoogleUser;
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

export async function getUserProfile(id: number): Promise<UserProfile | null> {
    try {
        const { data } = await api.get<UserProfile>('register/' + id);
        return {
            ...data,
            friends: [
                ...(data.friendsAsUser1 ?? []).map(f => f.user2),
                ...(data.friendsAsUser2 ?? []).map(f => f.user1),
            ],
        };
    } catch (error) {
        handleApiError(error);
    }
}
export function getCurrentUserId(): number|null {
    return decodeToken()?.sub ?? null;
}

export function getCurrentUsername(): string | null {
    return decodeToken()?.username ?? null;
}

export async function googleLogin(token: string): Promise<GoogleAuthResponse> {
    try {
        const { data } = await api.post<GoogleAuthResponse>('auth', { token });
        return data;
    } catch (error) {
        handleApiError(error);
    }
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

