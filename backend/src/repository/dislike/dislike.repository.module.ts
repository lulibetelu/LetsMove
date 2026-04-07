import { Module } from '@nestjs/common';
import { DislikeRepositoryService } from './dislike.repository.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DislikeRepositoryService],
  exports: [DislikeRepositoryService],
})
export class DislikeRepositoryModule {}
