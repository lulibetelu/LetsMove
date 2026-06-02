import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateImageDto } from '../../images/dto/create-image.dto';
import { Member } from '../entities/group.entity';

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => CreateImageDto)
  @ValidateNested()
  image?: CreateImageDto;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  membersIdToRemove: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Member)
  @ValidateNested({ each: true })
  membersToUpdate: Member[];
}
