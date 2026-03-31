import {
  ArrayNotEmpty,
  IsDefined,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class DeletePreferencesDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ArrayNotEmpty()
  sports: string[];
}
