import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRegisterDto } from './dto/update.register.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRepositoryService } from '../repository/user/user.repository.service';

@Injectable()
export class RegisterService {
  constructor(private userRepositoryService: UserRepositoryService) {}

  async create(registerDto: RegisterDto) {
    return this.userRepositoryService.createUser(registerDto);
  }

  async findAll() {
    const prismaPromise = await this.userRepositoryService.findAll();
    if (!prismaPromise) throw new NotFoundException();
    return prismaPromise;
  }

  async findOne(id: number) {
    const prismaPromise = await this.userRepositoryService.findById(id);
    if (!prismaPromise) throw new NotFoundException();
    return prismaPromise;
  }

  async update(id: number, updateRegisterDto: UpdateRegisterDto) {
    const user = await this.userRepositoryService.findById(id);

    if (!user) throw new NotFoundException();

    return this.userRepositoryService.update(id, updateRegisterDto);
  }

  async remove(id: number) {
    const user = await this.userRepositoryService.findById(id);

    if (!user) throw new NotFoundException();
    return this.userRepositoryService.removeById(id);
  }
}
