export interface Event {
  title: string;
  description: string;
  startingDate: Date;
  endingDate?: Date;
  eventType: string;
  locationName?: string;
}
