import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsInt()
  @IsNotEmpty()
  locationId: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  birthday: Date;
}
