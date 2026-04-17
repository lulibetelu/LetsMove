import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFriendDto {
  @IsNumber()
  @IsNotEmpty()
  receiverId: number;
}
