import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsDefined()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
