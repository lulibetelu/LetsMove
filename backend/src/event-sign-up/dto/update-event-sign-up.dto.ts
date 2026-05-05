import { IsDefined, IsIn, IsNumber, IsString } from 'class-validator';

export class UpdateEventSignUpDto {
  @IsDefined()
  @IsNumber()
  eventId: number;

  @IsIn(['Accepted', 'Rejected'])
  @IsString()
  @IsDefined()
  state: string;

  @IsNumber()
  @IsDefined()
  userId: number;
}
