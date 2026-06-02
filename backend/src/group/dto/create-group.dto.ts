import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateImageDto } from '../../images/dto/create-image.dto';
import { Member } from '../entities/group.entity';

export class CreateGroupDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  description: string;

  @IsOptional()
  @Type(() => CreateImageDto)
  @ValidateNested()
  image?: CreateImageDto;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Member)
  @ValidateNested({ each: true })
  members: Member[];
  // el author debe estar incluido aca
}
