import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import 'dotenv/config';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      },
      defaults: {
        from: `"Let's Move" <${process.env.GMAIL_USER}>`,
      },
      template: {
        dir: join(__dirname, '..', '..', 'mailNotification', 'templates'),
        adapter: new HandlebarsAdapter(),
      },
    }),
    EventModule,
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService], // exportas MailService para usarlo en otros módulos
})
export class MailModule {}
