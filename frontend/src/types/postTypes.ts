import type {ImageInput, ImageRelation} from "./imageType.ts";

export interface PostType {
    id:number,
    userId: number,
    content: string,
    user: {
        username: string,
    },
    isLiked: boolean,
    isDisliked: boolean,
    canDelete?: boolean,
    deletePost?: () => void,
    images?: ImageRelation[]
}
export interface NewPostCredentials {
    content: string,
    selectedSportsId: number[],
    images?: ImageInput[]
}

