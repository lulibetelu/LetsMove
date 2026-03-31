import { IsDefined, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class ModifyPreferenceDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  sport: string;

  @IsIn(['Principiante', 'Intermedio', 'Experto', 'Profesional'])
  level: string;
}
