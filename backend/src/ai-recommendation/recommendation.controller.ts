import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}
  @Get(':id')
  get(@Param('id', ParseIntPipe) userId: number) {
    return this.recommendationService.getFriendRecommendations(userId);
  }

  @Patch(':id')
  updateVector(@Param('id', ParseIntPipe) userId: number) {
    return this.recommendationService.updateUserEmbedding(userId);
  }
}
