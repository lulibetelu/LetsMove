
export interface User{
    id: number,
    username: string,
    email: string,
    //extend when needed
}

export interface UserProfile {
    id: number;
    username: string;
    biography: string | null;
    preferences: {
        id: number;
        sportId: number;
        level: string | null;
        sport: { id: number; name: string };
    }[];
    userLocations: {
        id: number;
        userId: number;
        locationId: number;
        location: { id: number; location: string; latitude: number; longitude: number };
    }[];
    friendsAsUser1?: { user2: { id: number; username: string } }[];
    friendsAsUser2?: { user1: { id: number; username: string } }[];
    friends: { id: number; username: string }[];
}

export interface RegisterCredentials{
    username: string,
    email: string,
    password: string
}

export interface LoginCredentials{
    email: string,
    password: string,
}

