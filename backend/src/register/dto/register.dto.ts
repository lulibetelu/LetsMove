import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

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

  @IsOptional()
  @IsInt()
  locationId?: number;
}
