import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFriendDto {
  @IsNumber()
  @IsNotEmpty()
  friendId: number;

  @IsIn(['Accepted', 'Rejected'])
  @IsString()
  @IsNotEmpty()
  state: string;
}
