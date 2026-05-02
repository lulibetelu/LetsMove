export interface EventType{
    id: number,
    hostId: number,
    title: string,
    description: string,
    chatId?: number,
    startingDate: Date,
    locationId?: number,
    endingDate?: Date,
    eventType: string

}