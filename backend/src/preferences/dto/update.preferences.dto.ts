import { CreatePreferencesDto } from './create.preferences.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePreferencesDto extends PartialType(CreatePreferencesDto) {}
