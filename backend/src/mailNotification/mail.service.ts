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
  async sendPasswordResetEmail(email: string, username: string, token: string) {
    const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:3000';
    const resetUrl = `${backendUrl}/password-reset/reset?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: "Reset your password - Let's Move",
      template: 'PasswordReset',
      context: {
        userName: username,
        resetUrl,
      },
    });
  }

  async sendVerificationEmail(email: string, username: string, token: string) {
    const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:3000';
    const verificationUrl = `${backendUrl}/email-verification?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: "Verify your email - Let's Move",
      template: 'EmailVerification',
      context: {
        userName: username,
        verificationUrl,
      },
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_5PM)
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
        if (!signup.user.notificationsEnabled) continue;
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
