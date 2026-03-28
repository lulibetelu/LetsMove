import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from '../../register/dto/register.dto';
import { UpdateRegisterDto } from '../../register/dto/update-register.dto';

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

  async createUser(registerDto: RegisterDto) {
    return this.prismaService.user.create({
      data: registerDto,
    });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async update(id: number, updateRegisterDto: UpdateRegisterDto){
    return this.prismaService.user.update({
      where: { id: id },
      data: updateRegisterDto,
    });
  }

  async removeById(id: number){
    return this.prismaService.user.delete({
      where: { id: id },
    });
  }
}
