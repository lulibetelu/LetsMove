import type {RegisterCredentials} from "../types/userTypes.ts";

const API_URL = 'http://localhost:3000/';

export async function createUser(credentials: RegisterCredentials){
    const response = await fetch(API_URL + 'register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'http://localhost:5137'},
        body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error(`Failed to create user: ${response.status}`);
    return response.json();
}