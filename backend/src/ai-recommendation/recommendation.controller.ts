import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}
  @UseGuards(AuthGuard)
  @Get('user')
  getUserRecommendations(@Req() req: Request) {
    const userId: number = req.user.sub;
    return this.recommendationService.getFriendRecommendations(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('user')
  updateUserVector(@Req() req: Request) {
    const userId: number = req.user.sub;
    return this.recommendationService.updateUserEmbedding(userId);
  }

  @UseGuards(AuthGuard)
  @Get('event')
  getEventRecommendations(@Req() req: Request) {
    const userId: number = req.user.sub;
    return this.recommendationService.getEventRecommendation(userId);
  }
}
