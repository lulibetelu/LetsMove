import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  @IsIn(['Cover', 'Gallery'])
  imageDescription?: string;

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

//TODO agregar isPrivate a la parte de la creación del evento en el front
