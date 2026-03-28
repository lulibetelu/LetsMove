import { ArrayMinSize, IsDefined } from 'class-validator';

export class PreferencesDto {
  @IsDefined()
  username: string;

  @ArrayMinSize(2)
  sports: string[];
  level: string;
}
