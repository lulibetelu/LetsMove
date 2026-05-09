import type {User} from "./userTypes.ts";
import type {LocationType} from "./fileTypes.ts";

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
    location: LocationType


}

export interface EventRawData {
    title: string ,
    description: string,
    type: string ,
    startingDate: string,
    endingDate: string,
    location: string | undefined
}

export interface CreateEventType{
    title: string ,
    description: string,
    type: string ,
    startingDate: Date,
    endingDate?: Date,
    location?: string
}