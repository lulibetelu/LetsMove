export interface PostType {
    id:number,
    userId: number,
    content: string,
    user: {
        username: string,
    }
}

export type PostTypes = PostType;