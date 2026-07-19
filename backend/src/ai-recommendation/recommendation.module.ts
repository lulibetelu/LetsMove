import { Module } from '@nestjs/common';
import { RegisterModule } from '../register/register.module';
import { EventModule } from '../event/event.module';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { GeminiModule } from './gemini/gemini.module';
import { RecommendationRepositoryModule } from '../repository/recommendation/recommendation.module';

@Module({
  imports: [
    RegisterModule,
    EventModule,
    GeminiModule,
    RecommendationRepositoryModule,
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService],
  exports: [RecommendationService],
})
export class RecommendationModule {}
