import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { LikeRepositoryService } from './like.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [LikeRepositoryService],
  exports: [LikeRepositoryService],
})
export class LikeRepositoryModule {}
