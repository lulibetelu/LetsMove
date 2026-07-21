import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
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

  @IsOptional()
  @IsString()
  // esto lo que hace es que si password es == a '', se skipea la ultima validacion
  @ValidateIf((_, value) => value !== '')
  @MinLength(8)
  password?: string;

  @IsInt()
  @IsNotEmpty()
  locationId: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  birthday: Date;

  @IsOptional()
  @IsBoolean()
  isGoogleUser?: boolean;
}
