import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepositoryService {
  constructor(private prismaService: PrismaService) {}
  async findByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });
  }
  async findById(userId: number) {
    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findByEmail(userEmail: string) {
    return this.prismaService.user.findUnique({
      where: {
        email: userEmail,
      },
    });
  }
}
