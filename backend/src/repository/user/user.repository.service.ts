import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from '../../register/dto/register.dto';
import { UpdateRegisterDto } from '../../register/dto/update.register.dto';

@Injectable()
export class UserRepositoryService {
  constructor(private prismaService: PrismaService) {}
  async findByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        biography: true,
      },
    });
  }
  async findById(userId: number) {
    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        biography: true,
        preferences: true,
        userLocations: {
          include: {
            location: true,
          },
        },
      },
    });
  }

  async findByEmail(userEmail: string) {
    return this.prismaService.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
        username: true,
        biography: true,
        password: true,
        email: true,
      },
    });
  }

  async createUser(registerDto: RegisterDto) {
    return this.prismaService.user.create({
      data: registerDto,
      select: {
        id: true,
        username: true,
        biography: true,
      },
    });
  }

  async findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
        biography: true,
      },
    });
  }

  async update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return this.prismaService.user.update({
      where: { id: id },
      data: updateRegisterDto,
      select: {
        id: true,
        username: true,
        biography: true,
      },
    });
  }

  async removeById(id: number) {
    return this.prismaService.user.delete({
      where: { id: id },
      select: {
        id: true,
        username: true,
        biography: true,
      },
    });
  }
}
