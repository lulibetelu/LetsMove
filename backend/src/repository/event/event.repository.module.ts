import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EventRepositoryService } from './event.repository.service';
import { EventSignUpRepositoryModule } from '../eventSignUp/event-sign-up.repository.module';

@Module({
  imports: [PrismaModule, forwardRef(() => EventSignUpRepositoryModule)],
  providers: [EventRepositoryService],
  exports: [EventRepositoryService],
})
export class EventRepositoryModule {}
