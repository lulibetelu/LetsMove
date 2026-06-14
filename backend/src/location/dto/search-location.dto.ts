import { IsOptional, IsString } from 'class-validator';

export class SearchLocationDto {
  @IsOptional()
  @IsString()
  q?: string;
}
