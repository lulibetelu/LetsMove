import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFriendDto {
  @IsNumber()
  @IsNotEmpty()
  friendId: number;
}
