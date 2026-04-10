import type {PostType} from "./postTypes.ts";

export interface FindAllPostsTypes {
    formattedPosts: PostType[],
    newCursor: number|undefined,
}
