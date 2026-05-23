export interface ImageInput {
    content?: string;
    url?: string;
    description?: string;
}
export interface ImageRelation {
    image: {
        id: number;
        url?: string;
    };
}
export interface ImageEvent extends ImageRelation {
    description: string;
}