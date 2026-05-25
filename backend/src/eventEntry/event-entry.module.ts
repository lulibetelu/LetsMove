import { Module } from '@nestjs/common';
import { EventRepositoryModule } from '../repository/event/event.repository.module';
import { EventEntryController } from './event-entry.controller';
import { EventEntryService } from './event-entry.service';
import { EventSignUpRepositoryModule } from '../repository/eventSignUp/event-sign-up.repository.module';
import { ImageModule } from '../images/image.module';

@Module({
  imports: [EventRepositoryModule, EventSignUpRepositoryModule, ImageModule],
  controllers: [EventEntryController],
  providers: [EventEntryService],
})
export class EventEntryModule {}
