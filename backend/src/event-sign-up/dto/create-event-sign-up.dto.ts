import { IsDefined, IsNumber } from 'class-validator';

export class CreateEventSignUpDto {
  @IsDefined()
  @IsNumber()
  eventId: number;
}
