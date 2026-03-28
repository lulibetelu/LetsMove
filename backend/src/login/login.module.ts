import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepositoryModule } from '../repository/user/user.repository.module';

@Module({
  imports: [UserRepositoryModule],
  controllers: [LoginController],
  providers: [LoginService, PrismaService],
  exports: [LoginService],
})
export class LoginModule {}
