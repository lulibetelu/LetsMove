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