export interface CreateComment{
    postId: number,
    parentId?: number,
    content: string
}

export interface CommentRequestType{
    id: number,
    content: string,
    createdAt: Date,
    userId: number,
    comments: {
        id: number,
        authorId: number,
        postId: number,
        parentId?: number,
        content: string,
        createdAt: Date,
        user: {
            username: string,
        }

    }[]

}