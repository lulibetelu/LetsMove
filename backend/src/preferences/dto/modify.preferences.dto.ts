import { IsDefined, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class ModifyPreferencesDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  sport: string;

  @IsIn(['Principiante', 'Intermedio', 'Experto', 'Profesional'])
  level: string;
}
