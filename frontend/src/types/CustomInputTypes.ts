import type {ChangeEventHandler} from "react";

export interface InputProps {
    type: string,
    placeHolder: string,
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    readOnly?: boolean,
}

export interface CustomInputProps {
    label: string,
    input: InputProps,
}