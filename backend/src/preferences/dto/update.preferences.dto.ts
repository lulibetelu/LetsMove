import {
  ArrayNotEmpty,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePreferencesDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ArrayNotEmpty()
  sports: string[];

  @IsOptional()
  @IsIn(['Principiante', 'Intermedio', 'Experto', 'Profesional'])
  level: string;
}
