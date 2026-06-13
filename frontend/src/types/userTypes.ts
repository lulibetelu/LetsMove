
export interface User{
    id: number,
    username: string,
    email: string,
    //extend when needed
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

