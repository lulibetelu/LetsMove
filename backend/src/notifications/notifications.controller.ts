import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';
import { NotificationsService } from './notifications.service';

@Controller('notification')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}
  @Patch('toggle')
  @UseGuards(AuthGuard)
  async toggleNotification(@Req() req: Request) {
    const userId: number = req.user.sub;
    return this.notificationService.toggleNotification(userId);
  }

  @Get('isEnabled')
  @UseGuards(AuthGuard)
  async isNotificationEnabled(@Req() req: Request) {
    const userId: number = req.user.sub;
    return this.notificationService.isNotificationEnabled(userId);
  }
}
