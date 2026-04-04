import type {LoginCredentials, RegisterCredentials} from "../types/userTypes.ts";

// hay que poner esta variable en el env
const API_URL = 'http://localhost:3000/';

interface LoginResponse{
    access_token: string
}

export async function createUser(credentials: RegisterCredentials){
    const response = await fetch(API_URL + 'register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error(`Failed to create user: ${response.status}`);
    return response.json();
}

export async function loginUser(credentials: LoginCredentials){
    const response = await fetch(API_URL + 'login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error(`Failed to login user: ${response.status}`)
    const data: LoginResponse =  await response.json();
    return data.access_token;
}
