import { IsDefined, IsNotEmpty } from 'class-validator';

export class PreferenceEntity {
  userId: number;
  sportId: number;
  @IsNotEmpty()
  @IsDefined()
  level: string;
}
