import { IsOptional } from 'class-validator';

export class FilterEventDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  host?: string;

  @IsOptional()
  sport?: string;
}
