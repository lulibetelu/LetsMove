import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateImageDto } from '../../images/dto/create-image.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startingDate?: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  images?: CreateImageDto[];

  @IsOptional()
  @IsString()
  location?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endingDate?: Date;

  @IsBoolean()
  @IsOptional()
  isPrivate?: boolean;
}
