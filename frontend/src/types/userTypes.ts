import type {ChangeEventHandler} from "react";

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

export interface InputProps {
    type: string,
    placeHolder: string,
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
}

export interface CustomInputProps {
    label: string,
    input: InputProps,
}