import { IsOptional, IsString } from 'class-validator';

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
}
