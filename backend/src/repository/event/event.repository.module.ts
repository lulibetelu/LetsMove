import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EventRepositoryService } from './event.repository.service';
import { EventSignUpModule } from '../../event-sign-up/event-sign-up.module';
import { EventSignUpRepositoryModule } from '../eventSignUp/event-sign-up.repository.module';

@Module({
  imports: [PrismaModule, forwardRef(() => EventSignUpRepositoryModule)],
  providers: [EventRepositoryService],
  exports: [EventRepositoryService],
})
export class EventRepositoryModule {}
