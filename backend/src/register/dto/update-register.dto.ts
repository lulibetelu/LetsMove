import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateRegisterDto extends PartialType(RegisterDto) {}
