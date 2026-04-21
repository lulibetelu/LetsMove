export interface CreateComment{
    postId: number,
    parentId?: number,
    content: string
}

export interface CommentRequestType{
    id: number,
    content: string,
    createdAt: string,
    userId: number,
    comments: {
        id: number,
        authorId: number,
        postId: number,
        parentId?: number,
        content: string,
        createdAt: string,
        user: {
            username: string,
        }

    }[]

}