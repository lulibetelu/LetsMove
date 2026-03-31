import { ArrayMinSize, IsIn } from 'class-validator';

export class CreatePreferencesDto {
  @ArrayMinSize(2)
  sports: string[];

  @IsIn(['Principiante', 'Intermedio', 'Experto', 'Profesional'])
  level: string;
}
