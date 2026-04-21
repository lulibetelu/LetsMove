import type {LoginCredentials, RegisterCredentials, User} from "../types/userTypes.ts";
const url = import.meta.env.VITE_API_URL;
interface LoginResponse{
    access_token: string
}

export async function createUser(credentials: RegisterCredentials){
    const response = await fetch(url + 'register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error(`Failed to create user: ${response.status}`);
    return response.json();
}

export async function loginUser(credentials: LoginCredentials){
    const response = await fetch(url + 'login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error(`Failed to login user: ${response.status}`)
    const data: LoginResponse =  await response.json();
    return data.access_token;
}

export async function getUsernameFromId(id?: number): Promise<string | null> {
    if (!id) {
        return decodeToken()?.username ?? null;
    }
    else {
        const response = await fetch(url + 'register/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error(`Couldn't get username from ${id} : ${response.status}`)
        const user: User = await response.json();
        return user.username;
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

