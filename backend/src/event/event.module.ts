import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventRepositoryModule } from '../repository/event/event.repository.module';
import { ImageModule } from '../images/image.module';
import { GeminiModule } from '../ai-recommendation/gemini/gemini.module';

@Module({
  imports: [EventRepositoryModule, ImageModule, GeminiModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
