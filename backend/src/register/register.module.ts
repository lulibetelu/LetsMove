import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { UserRepositoryModule } from '../repository/user/user.repository.module';
import { MailModule } from '../mailNotification/mail.module';
import { AuthModule } from '../authentication/auth.module';

@Module({
  imports: [UserRepositoryModule, MailModule, AuthModule],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
