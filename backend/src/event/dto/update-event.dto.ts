import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsDate()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endingDate?: Date;
}
