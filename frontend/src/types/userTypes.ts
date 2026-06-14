import type {Preference} from "./preferenceType.ts";
import type {UserLocation} from "./locationTypes.ts";

export interface User{
    id: number,
    username: string,
    email?: string,
    //extend when needed
}

export interface UserProfile {
    id: number;
    username: string;
    biography: string | null;
    preferences: Preference[];
    userLocations: UserLocation[];
    friendsAsUser1?: { user2: {id: number, username: string, } }[];
    friendsAsUser2?: { user1: {id: number, username: string, } }[];
    friends: User[];
}

export interface RegisterCredentials{
    username: string,
    email: string,
    password: string,
    locationId?: number
}

export interface LoginCredentials{
    email: string,
    password: string,
}

