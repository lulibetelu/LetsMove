import { Module } from '@nestjs/common';
import { EventSignUpService } from './event-sign-up.service';
import { EventSignUpController } from './event-sign-up.controller';
import { EventSignUpRepositoryModule } from '../repository/eventSignUp/event-sign-up.repository.module';

@Module({
  imports: [EventSignUpRepositoryModule],
  controllers: [EventSignUpController],
  providers: [EventSignUpService],
})
export class EventSignUpModule {}
