import { CreatePreferencesDto } from '../../preferences/dto/create.preferences.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRegisterDto extends PartialType(CreatePreferencesDto) {}
