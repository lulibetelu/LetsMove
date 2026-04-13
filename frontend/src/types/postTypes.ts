export interface PostType {
    id:number,
    userId: number,
    content: string,
    user: {
        username: string,
    },
    isLiked: boolean,
    isDisliked: boolean
}
export interface NewPostCredentials {
    content: string,
}

