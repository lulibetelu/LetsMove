// mail/mail.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('test')
  async testMail() {
    await this.mailService.sendEventReminder(
      { username: 'Tomardo', email: 'tomasbrg42@gmail.com' },
      {
        eventType: 'InPerson',
        title: 'Test Event',
        startingDate: new Date(),
        locationName: 'Buenos Aires',
        description: 'Test description',
      },
    );
    return { message: 'Email sent' };
  }
}
