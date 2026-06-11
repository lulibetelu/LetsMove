import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  host?: string;

  @IsOptional()
  @IsString()
  sport?: string;

  @IsOptional()
  @IsNumber()
  saved?: number;

  @IsOptional()
  @IsNumber()
  joined?: number;
}
