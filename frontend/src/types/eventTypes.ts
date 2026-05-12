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
    location?: LocationType,
    imageEvents?: ImageEvent[],
    isPrivate: boolean,
}

export interface EventSignUp {
    id: number;
    eventId: number;
    userId: number;
    state: string;
    joinedAt: Date | null;
    user: {
        id: number;
        username: string;
    };
}
export interface EventRawData {
    title: string ,
    description: string,
    type: string ,
    startingDate: string,
    endingDate: string,
    location: string | undefined
}

export interface CreateEventType {
    title: string,
    description: string,
    type: string,
    startingDate: Date,
    endingDate?: Date,
    location?: string

}
export interface UpdateEventRawData{
    id: number,
    title: string ,
    description: string,
    type: string ,
    startingDate: string,
    endingDate: string | undefined,
    location: string | undefined
}

export type UpdateEventType = Omit<CreateEventType, 'title' | 'type'>

export interface PendingParticipant extends EventSignUp {
    eventTitle: string;
}