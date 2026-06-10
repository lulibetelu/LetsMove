import {
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateImageDto } from '../../images/dto/create-image.dto';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startingDate: Date;

  @IsNotEmpty()
  @IsString()
  sportName: string;

  @IsOptional()
  @Type(() => CreateImageDto)
  coverImage?: CreateImageDto;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Asynchronous', 'InPerson'])
  type: string;

  @IsOptional()
  @IsString()
  location?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endingDate?: Date;

  @IsNotEmpty()
  @IsBoolean()
  isPrivate: boolean;
}
