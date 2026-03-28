import { Injectable } from '@nestjs/common';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { UserRepositoryService } from '../repository/user/user.repository.service';

@Injectable()
export class RegisterService {
  constructor(
    private prismaService: PrismaService,
    private userRepositoryService: UserRepositoryService,
  ) {}
  async create(registerDto: RegisterDto): Promise<RegisterDto> {
    return this.userRepositoryService.createUser(registerDto);
  }

  async findAll() {
    return this.userRepositoryService.findAll();
  }

  async findOne(id: number) {
    return this.userRepositoryService.findById(id);
  }

  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return this.userRepositoryService.update(id, updateRegisterDto);
  }

  remove(id: number) {
    return this.userRepositoryService.removeById(id);
  }
}
