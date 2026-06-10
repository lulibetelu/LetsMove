import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MessageRepositoryService } from './message.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [MessageRepositoryService],
  exports: [MessageRepositoryService],
})
export class MessageRepositoryModule {}
