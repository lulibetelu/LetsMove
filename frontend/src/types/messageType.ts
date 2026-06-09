import type {ImageInput} from "./imageType.ts";

export interface Message{
    id: number;
    groupId: number;
    content: string;
    groupMemberId: number;
    date: Date;
    images?: ImageInput
}