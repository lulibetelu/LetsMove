import { Module } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { EmailVerificationController } from './email-verification.controller';
import { UserRepositoryModule } from '../repository/user/user.repository.module';
import { AuthModule } from '../authentication/auth.module';
import { MailModule } from '../mailNotification/mail.module';

@Module({
  imports: [UserRepositoryModule, AuthModule, MailModule],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],
})
export class EmailVerificationModule {}
