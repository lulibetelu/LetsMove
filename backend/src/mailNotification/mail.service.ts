import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import * as Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';
import { User } from 'backend/src/register/entities/register.entity';
import type { Event } from 'backend/src/event/entities/event.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventService } from '../event/event.service';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly templateDir = join(
    __dirname,
    '..',
    '..',
    'mailNotification',
    'templates',
  );
  private readonly fromEmail =
    process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

  constructor(
    private readonly resend: Resend,
    private readonly eventService: EventService,
  ) {}

  private renderTemplate(
    name: string,
    context: Record<string, unknown>,
  ): string {
    const filePath = join(this.templateDir, `${name}.hbs`);
    const source = readFileSync(filePath, 'utf-8');
    const template = Handlebars.compile(source);
    return template(context);
  }

  async sendPasswordResetEmail(email: string, username: string, token: string) {
    const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:3000';
    const resetUrl = `${backendUrl}/password-reset/reset?token=${token}`;

    const html = this.renderTemplate('PasswordReset', {
      userName: username,
      resetUrl,
    });

    await this.resend.emails.send({
      from: this.fromEmail,
      to: email,
      subject: "Reset your password - Let's Move",
      html,
    });
  }

  async sendVerificationEmail(email: string, username: string, token: string) {
    const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:3000';
    const verificationUrl = `${backendUrl}/email-verification?token=${token}`;

    const html = this.renderTemplate('EmailVerification', {
      userName: username,
      verificationUrl,
    });
    this.logger.log('Attempting to send email:');
    const result = await this.resend.emails.send({
      from: this.fromEmail,
      to: email,
      subject: "Verify your email - Let's Move",
      html,
    });

    if (result.error)
      this.logger.log(`Failed to send email: ${JSON.stringify(result.error)}`);
    else this.logger.log(`Email sent: ${JSON.stringify(result.data)}`);
  }

  @Cron(CronExpression.EVERY_MINUTE)
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
    let html: string;

    if (event.eventType === 'InPerson') {
      html = this.renderTemplate('InPersonMailReminderTemplate', {
        userName: user.username,
        eventName: event.title,
        eventDate: event.startingDate,
        eventLocation: event.locationName,
      });
    } else {
      html = this.renderTemplate('AsyncMailReminderTemplate', {
        userName: user.username,
        eventName: event.title,
        startingDate: event.startingDate,
        endDate: event.eventType === 'Async' ? event.endingDate : undefined,
      });
    }

    await this.resend.emails.send({
      from: this.fromEmail,
      to: user.email,
      subject: `Reminder: ${event.title} is tomorrow!`,
      html,
    });
  }
}
