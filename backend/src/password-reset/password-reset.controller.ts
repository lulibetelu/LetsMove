import { Controller, Post, Get, Body, Query, Res } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from '../mailNotification/mail.service';
import type { Response } from 'express';

@Controller('password-reset')
class PasswordResetController {
  constructor(
    private readonly passwordResetService: PasswordResetService,
    private readonly mailService: MailService,
  ) {}

  @Post('request')
  async requestReset(@Body() dto: RequestPasswordResetDto) {
    const { token, user } = await this.passwordResetService.requestResetToken(
      dto.email,
    );

    await this.mailService.sendPasswordResetEmail(
      user.email,
      user.username,
      token,
    );

    return { message: 'If that email exists, a reset link has been sent.' };
  }

  @Get('reset')
  async verifyToken(@Query('token') token: string, @Res() res: Response) {
    try {
      await this.passwordResetService.verifyResetToken(token);
      const frontendUrl = process.env.URL ?? 'http://localhost:5173';
      res.redirect(`${frontendUrl}/password-reset?token=${token}`);
    } catch {
      const frontendUrl = process.env.URL ?? 'http://localhost:5173';
      res.redirect(`${frontendUrl}/error`);
    }
  }

  @Post('reset')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.passwordResetService.resetPassword(dto.token, dto.newPassword);
  }
}

export default PasswordResetController;
