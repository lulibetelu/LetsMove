import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EventRepositoryService } from './event.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [EventRepositoryService],
  exports: [EventRepositoryService],
})
export class EventRepositoryModule {}
