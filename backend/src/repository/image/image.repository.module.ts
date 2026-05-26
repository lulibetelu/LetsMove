import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ImageRepositoryService } from './image.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [ImageRepositoryService],
  exports: [ImageRepositoryService],
})
export class ImageRepositoryModule {}