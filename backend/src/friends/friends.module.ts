import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendsRepositoryModule } from '../repository/friends/friends.repository.module';
import { UserRepositoryModule } from '../repository/user/user.repository.module';

@Module({
  imports: [FriendsRepositoryModule, UserRepositoryModule],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
