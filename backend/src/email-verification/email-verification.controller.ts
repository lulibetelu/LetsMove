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
    const frontendUrl = process.env.URL ?? 'http://localhost:5173';
    try {
      await this.emailVerificationService.verifyEmail(token);
      return res.redirect(`${frontendUrl}/login`);
    } catch {
      return res.redirect(`${frontendUrl}/error`);
    }
  }
}
