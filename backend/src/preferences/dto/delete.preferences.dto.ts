import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class DeletePreferencesDto {
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsArray()
  sports: string[];
}
