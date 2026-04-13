import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendsRepositoryModule } from '../repository/friends/friends.repository.module';

@Module({
  imports: [FriendsRepositoryModule],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
