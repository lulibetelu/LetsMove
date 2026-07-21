import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateRegisterDto } from './dto/update.register.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRepositoryService } from '../repository/user/user.repository.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mailNotification/mail.service';

@Injectable()
export class RegisterService {
  constructor(
    private userRepositoryService: UserRepositoryService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async create(registerDto: RegisterDto) {
    const existingEmail = await this.userRepositoryService.findByEmail(
      registerDto.email,
    );
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingUsername = await this.userRepositoryService.findByUsername(
      registerDto.username,
    );
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    const user = await this.userRepositoryService.createUser(registerDto);

    if (!registerDto.isGoogleUser) {
      const token = await this.jwtService.signAsync(
        { sub: user.id, email: registerDto.email },
        { expiresIn: '24h' },
      );

      try {
        await this.mailService.sendVerificationEmail(
          registerDto.email,
          user.username,
          token,
        );
      } catch (error) {
        console.error('Failed to send verification email:', error);
        await this.userRepositoryService.removeById(user.id);
        throw new BadRequestException(
          'Could not send verification email. Please try again later.',
        );
      }
    }

    return user;
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
