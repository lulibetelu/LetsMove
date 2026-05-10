import type {User} from "./userTypes.ts";
import type {LocationType} from "./fileTypes.ts";

export interface ImageEvent {
    description: string;
    image: {
        url: string;
    };
}

export interface EventType{
    id: number,
    hostId: number,
    title: string,
    description: string,
    chatId?: number,
    startingDate: Date,
    locationId?: number,
    endingDate?: Date,
    eventType: string,
    host: User,
    location: LocationType,
    imageEvents?: ImageEvent[],
    isPrivate: boolean,
}