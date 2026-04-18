import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @IsArray()
  sports: number[];
}
