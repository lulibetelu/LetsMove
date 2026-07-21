import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import PasswordResetController from './password-reset.controller';
import { UserRepositoryModule } from '../repository/user/user.repository.module';
import { AuthModule } from '../authentication/auth.module';
import { MailModule } from '../mailNotification/mail.module';

@Module({
  imports: [UserRepositoryModule, AuthModule, MailModule],
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
})
export class PasswordResetModule {}
