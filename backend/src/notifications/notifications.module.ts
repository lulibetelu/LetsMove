import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { UserRepositoryModule } from '../repository/user/user.repository.module';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [UserRepositoryModule],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
