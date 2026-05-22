import { BadRequestException, Injectable } from '@nestjs/common';
import { ImageRepositoryService } from '../repository/image/image.repository.service';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImageService {
  constructor(private imageRepository: ImageRepositoryService) {}
  getOne(id: number) {
    return this.imageRepository.getOne(id);
  }
  create(dto: CreateImageDto) {
    if (dto.url) {
      return this.imageRepository.create({ url: dto.url });
    } else if (dto.content) {
      const [prefix, content] = dto.content.split(',');
      const mimeType = prefix.split(':')[1].split(';')[0];
      const uint8Array = new Uint8Array(Buffer.from(content, 'base64'));

      return this.imageRepository.create({ content: uint8Array, mimeType });
    } else {
      throw new BadRequestException('Debe proveer una url o un contenido');
    }
  }
}
