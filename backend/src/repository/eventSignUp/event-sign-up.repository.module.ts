import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EventSignUpRepositoryService } from './event-sign-up.repository.service';
import { EventRepositoryModule } from '../event/event.repository.module';

@Module({
  imports: [PrismaModule, forwardRef(() => EventRepositoryModule)],
  providers: [EventSignUpRepositoryService],
  exports: [EventSignUpRepositoryService],
})
export class EventSignUpRepositoryModule {}
