import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class RegisterService {
  constructor(private prismaService: PrismaService) {}
  async createUser(registerDto: RegisterDto): Promise<void> {
    await this.prismaService.user.create({
      data: {
        username: registerDto.username,
        email: registerDto.email,
        password: registerDto.password, //maybe hash it in the front or when we receive it
        biography: null,
      },
    });
  }
}
