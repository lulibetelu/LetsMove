import { Module } from '@nestjs/common';
import { Resend } from 'resend';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { EventModule } from '../event/event.module';

@Module({
  imports: [EventModule],
  controllers: [MailController],
  providers: [
    MailService,
    {
      provide: Resend,
      useFactory: () => new Resend(process.env.RESEND_API_KEY),
    },
  ],
  exports: [MailService],
})
export class MailModule {}
