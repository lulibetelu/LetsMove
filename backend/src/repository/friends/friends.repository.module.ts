import { FriendsRepositoryService } from './friends.repository.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FriendsRepositoryService],
  exports: [FriendsRepositoryService],
})
export class FriendsRepositoryModule {}
