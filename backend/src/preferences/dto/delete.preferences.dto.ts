import {
  ArrayNotEmpty,
} from 'class-validator';

export class DeletePreferencesDto {
  @ArrayNotEmpty()
  sports: string[];
}
