import { IsNumber } from 'class-validator';

export class SavedEventDto {
  @IsNumber()
  eventId: number;
}
