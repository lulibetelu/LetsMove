import {
  IsArray,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateImageDto } from '../../images/dto/create-image.dto';

export class CreateGroupDto {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsDefined()
  description: string;

  @IsOptional()
  @Type(() => CreateImageDto)
  image?: CreateImageDto;

  @IsNumber()
  @IsDefined()
  @IsArray()
  @MinLength(1)
  members: number[];
}
