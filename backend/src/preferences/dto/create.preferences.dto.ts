import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePreferencesDto {
  @ArrayMinSize(2)
  @IsString({ each: true })
  @IsArray()
  sports: string[];

  @IsIn(['Principiante', 'Intermedio', 'Experto', 'Profesional'])
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  level: string;
}
