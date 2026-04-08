import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDislikeDto {
  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
