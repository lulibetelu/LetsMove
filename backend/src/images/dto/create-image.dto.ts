import { IsOptional, IsString, IsUrl, IsIn } from 'class-validator';

export class CreateImageDto {
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Si se provee una url, debe tener un formato válido' })
  url?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Cover', 'Gallery'])
  description?: string;
}
