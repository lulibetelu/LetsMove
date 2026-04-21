import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindAllCommentDto {
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
