import type {ImageInput} from "./imageType.ts";

export interface Member {
    memberId?: number,
    userId?: number,
    isAdmin: boolean,
    lastReadMessageId?: number | null,
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
    unreadCount: number;
}