import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsNumber()
  @IsOptional()
  parentId?: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
