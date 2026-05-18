import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventRepositoryModule } from '../repository/event/event.repository.module';
import { EventSignUpModule } from '../event-sign-up/event-sign-up.module';

@Module({
  imports: [EventRepositoryModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
