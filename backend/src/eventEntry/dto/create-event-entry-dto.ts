import {
  IsArray,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateEventEntryDto {
  @IsNumber()
  @IsDefined()
  eventId: number;

  @IsString()
  @IsDefined()
  content: string;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  images?: string[];
}
