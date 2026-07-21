import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRegisterDto extends PartialType(RegisterDto) {
  @IsOptional()
  @IsString()
  biography?: string;
}
