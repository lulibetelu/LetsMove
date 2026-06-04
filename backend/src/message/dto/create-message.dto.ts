import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateImageDto } from '../../images/dto/create-image.dto';

export class CreateMessageDto {
  @IsNumber()
  @IsNotEmpty()
  groupId: number;

  @IsNumber()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  sentDate: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  images?: CreateImageDto[];
}
