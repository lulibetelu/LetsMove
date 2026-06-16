export interface MessageImage {
    imageId: number;
    image: {
        url: string | null;
    } | null;
}

export interface Message{
    id: number;
    groupId: number;
    content: string;
    groupMemberId: number;
    date: Date;
    images?: MessageImage[]
    groupMember: {
        id: number,
        userId: number,
        groupId: number,
        isAdmin: boolean,
        user: {
            username: string
        }
    }
}