import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryService } from '../repository/user/user.repository.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  toggleNotification(userId: number) {
    return this.userRepositoryService.toggleNotifications(userId);
  }

  async isNotificationEnabled(userId: number) {
    const user = await this.userRepositoryService.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    return { notificationsEnabled: user.notificationsEnabled };
  }
}
