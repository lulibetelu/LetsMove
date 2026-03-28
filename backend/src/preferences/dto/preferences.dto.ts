import { ArrayMinSize, IsDefined, IsIn } from 'class-validator';

export class PreferencesDto {
  @IsDefined()
  username: string;

  @ArrayMinSize(2)
  sports: string[];

  @IsIn(['Principiante', 'Intermedio', 'Experto', 'Profesional'])
  level: string;
}
