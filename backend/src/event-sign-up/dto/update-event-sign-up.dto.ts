import { PartialType } from '@nestjs/mapped-types';
import { CreateEventSignUpDto } from './create-event-sign-up.dto';

export class UpdateEventSignUpDto extends PartialType(CreateEventSignUpDto) {}
