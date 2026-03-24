import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_PASSWORD'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, PrismaService],
  exports: [LoginService],
})
export class LoginModule {}
