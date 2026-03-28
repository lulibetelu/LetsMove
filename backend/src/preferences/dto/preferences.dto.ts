import { IsDefined } from 'class-validator';

export class PreferencesDto {
  @IsDefined()
  username: string;

  sports: string[];
  level: string;
}
