import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ImageRepositoryModule } from '../repository/image/image.repository.module';

@Module({
  imports: [ImageRepositoryModule],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
