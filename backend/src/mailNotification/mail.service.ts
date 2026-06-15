import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'backend/src/register/entities/register.entity';
import type { Event } from 'backend/src/event/entities/event.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEventReminder(user: User, event: Event) {
    if (event.eventType === 'InPerson') {
      await this.mailerService.sendMail({
        to: user.email,
        subject: `Reminder: ${event.title} is tomorrow!!!!!!!!!`,
        template: 'InPersonMailReminderTemplate', // busca event-reminder.hbs en /templates
        context: {
          // variables disponibles en el templates
          userName: user.username,
          eventName: event.title,
          eventDate: event.startingDate,
          eventLocation: event.locationName,
        },
      });
    } else {
      await this.mailerService.sendMail({
        to: user.email,
        subject: `Reminder: ${event.title} is tomorrow!!!!!!!!!`,
        template: 'AsyncMailReminderTemplate', // busca event-reminder.hbs en /templates
        context: {
          // variables disponibles en el templates
          userName: user.username,
          eventName: event.title,
          startingDate: event.startingDate,
          endDate: event.endingDate,
        },
      });
    }
  }
}
