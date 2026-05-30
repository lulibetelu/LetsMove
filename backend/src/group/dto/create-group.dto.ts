import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateImageDto } from '../../images/dto/create-image.dto';

export class CreateGroupDto {
  @IsString()
  @IsDefined()
  title: string;

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
  @IsInt({ each: true })
  members: number[];
  // el author debe estar incluido aca
}
