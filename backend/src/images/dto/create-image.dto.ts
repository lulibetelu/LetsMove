import { IsOptional, IsString, IsUrl, IsBase64, IsIn } from 'class-validator';

export class CreateImageDto {
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Si se provee una url, debe tener un formato válido' })
  url?: string;

  @IsOptional()
  @IsString()
  @IsBase64(
    {},
    { message: 'El contenido debe ser un string en formato Base64' },
  )
  content?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Cover', 'Gallery'])
  description?: string;
}
