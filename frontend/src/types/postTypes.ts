export interface PostTypes {
    id:number,
    userId: number,
    content: string,
    user: {
        username: string,
    }
}