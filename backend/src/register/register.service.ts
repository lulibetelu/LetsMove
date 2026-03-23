import { Injectable } from '@nestjs/common';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class RegisterService {
  constructor(private prismaService: PrismaService) {}
  async create(registerDto: RegisterDto): Promise<RegisterDto> {
    return this.prismaService.user.create({
      data: registerDto,
    });
  }

  async findAll(){
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return this.prismaService.user.update({
      where: { id: id },
      data: updateRegisterDto,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({
      where: { id: id },
    });
  }
}
