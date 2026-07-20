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
        birthday: true,
      },
    });
  }
  async findById(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        preferences: {
          include: {
            sport: true,
          },
        },
        friendsAsUser1: {
          where: { state: 'Accepted' },
          select: {
            user2: { select: { id: true, username: true } },
          },
        },
        friendsAsUser2: {
          where: { state: 'Accepted' },
          select: {
            user1: { select: { id: true, username: true } },
          },
        },
        homeLocation: {
          select: {
            location: true,
          },
        },
      },
    });
    if (!user) return null;
    const { password, email, ...result } = user;
    return result;
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
        birthday: true,
      },
    });
  }

  async createUser(registerDto: RegisterDto) {
    const { locationId, password, birthday, ...userData } = registerDto;
    return this.prismaService.user.create({
      data: {
        ...userData,
        password: password ?? '',
        ...(locationId && { homeLocation: { connect: { id: locationId } } }),
        birthday,
        homeLocation: { connect: { id: locationId } },
      },
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
