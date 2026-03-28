import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { UserRepositoryModule } from '../repository/user/user.repository.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [UserRepositoryModule, PrismaModule],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
