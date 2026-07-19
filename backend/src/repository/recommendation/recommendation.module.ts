import { Module } from '@nestjs/common';
import { RecommendationRepositoryService } from './recommendation.repository.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RecommendationRepositoryService],
  exports: [RecommendationRepositoryService],
})
export class RecommendationRepositoryModule {}
