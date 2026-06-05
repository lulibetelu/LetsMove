import { Module } from '@nestjs/common';
import { SavedEventService } from './saved-event.service';
import { SavedEventController } from './saved-event.controller';
import { SavedEventRepositoryModule } from '../repository/savedEvent/saved-event.repository.module';

@Module({
  imports: [SavedEventRepositoryModule],
  controllers: [SavedEventController],
  providers: [SavedEventService],
})
export class SavedEventModule {}
