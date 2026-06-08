import type {ImageInput} from "./imageType.ts";

interface Member {
    memberId: number,
    isAdmin: boolean,
}
export interface CreateGroup {
    image?: ImageInput;
    name: string;
    description: string;
    members: Member[];
}
export interface UpdateGroup {
    image?: ImageInput;
    name?: string;
    description?: string;
    membersToUpdate?: Member[];
    membersIdToRemove?: number[]
}

export interface Group {
    id: number;
    name: string;
    description: string;
    imageId: number;
    groupMembers: Member[];

}