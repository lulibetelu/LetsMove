import { IsIn, IsString } from 'class-validator';

export class SportPreferenceDto {
  @IsString()
  sport: string;

  @IsIn(['Principiante', 'Intermedio', 'Experto'])
  level: string;
  //For type validator. It needs a function to run so I give it the constructor
  constructor(sport: string, level: string) {
    this.sport = sport;
    this.level = level;
  }
}
