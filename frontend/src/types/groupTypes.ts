import type {ImageInput} from "./imageType.ts";

export interface CreateGroup {
    imageId?: ImageInput;
    title: string;
    description: string;
    members: number[];
}
export interface UpdateGroup {
    imageId?: ImageInput;
    title?: string;
    description?: string;
    members?: number[];
}