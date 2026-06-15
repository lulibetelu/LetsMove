import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'backend/src/register/entities/register.entity';
import type { Event } from 'backend/src/event/entities/event.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventService } from '../event/event.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly eventService: EventService,
  ) {}
  @Cron(CronExpression.EVERY_5_MINUTES)
  async sendEventReminders() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const start = new Date(tomorrow);
    start.setHours(0, 0, 0, 0);

    const end = new Date(tomorrow);
    end.setHours(23, 59, 59, 999);

    const events = await this.eventService.getEventsBetweenDates(start, end);

    for (const event of events) {
      const {
        title,
        startingDate,
        endingDate,
        eventType,
        location,
        description,
      } = event;

      const filteredEvent: Event = {
        title,
        startingDate,
        eventType,
        description,
        endingDate: endingDate ? endingDate : undefined,
        locationName: location ? location.location : undefined,
      };

      for (const signup of event.eventSignUp) {
        await this.sendEventReminder(signup.user, filteredEvent);
      }
    }
  }
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
