import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventRepositoryModule } from '../repository/event/event.repository.module';
import { ImageModule } from '../images/image.module';

@Module({
  imports: [EventRepositoryModule, ImageModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
