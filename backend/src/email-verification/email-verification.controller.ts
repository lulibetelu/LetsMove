import { Controller, Get, Query, Res } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import type { Response } from 'express';

@Controller('email-verification')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Get()
  async verify(@Query('token') token: string, @Res() res: Response) {
    try {
      await this.emailVerificationService.verifyEmail(token);
      res.redirect(`${process.env.URL}/login`);
    } catch {
      res.redirect(`${process.env.URL}/error`);
    }
  }
}
