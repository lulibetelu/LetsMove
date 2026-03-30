export interface User{
    id: number,
    username: string,
    email: string,
    //extend when needed
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