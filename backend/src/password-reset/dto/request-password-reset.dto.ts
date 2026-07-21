import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RequestPasswordResetDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
