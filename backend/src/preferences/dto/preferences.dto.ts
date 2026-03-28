import { ArrayMinSize, IsDefined, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class PreferencesDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ArrayMinSize(2)
  sports: string[];

  @IsIn(['Principiante', 'Intermedio', 'Experto', 'Profesional'])
  level: string;
}
