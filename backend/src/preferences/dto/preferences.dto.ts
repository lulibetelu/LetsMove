import { IsDefined, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class SportPreferenceDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  sport: string;

  @IsIn(['beginner', 'intermediate', 'expert'])
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  level: string;
  //For type validator. It needs a function to run so I give it the constructor
  constructor(sport: string, level: string) {
    this.sport = sport;
    this.level = level;
  }
}
