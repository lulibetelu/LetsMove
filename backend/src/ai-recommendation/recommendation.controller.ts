import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';
import { ParseIntPipe } from '@nestjs/common';

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

  @UseGuards(AuthGuard)
  @Get('user/explain/:id')
  explainUserRecommendation(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId: number = req.user.sub;
    return this.recommendationService.explainUserRecommendation(userId, id);
  }

  @UseGuards(AuthGuard)
  @Get('event/explain/:id')
  explainEventRecommendation(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId: number = req.user.sub;
    return this.recommendationService.explainEventRecommendation(userId, id);
  }
}
