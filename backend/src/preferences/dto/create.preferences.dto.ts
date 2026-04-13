import { SportPreferenceDto } from './preferences.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePreferencesDto {
  //Este le dice a nest que valide los objetos del arreglo con las propias reglas de SportPreferenceDto.
  @ValidateNested({ each: true })
  //Makes an instance out of each object inside the array.
  @Type(() => SportPreferenceDto)
  sports: SportPreferenceDto[];
}
