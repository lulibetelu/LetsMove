import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService } from '../repository/user/user.repository.service';

@Injectable()
export class LoginService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private userRepositoryService: UserRepositoryService,
  ) {}
  async login(email: string, pass: string) {
    const user = await this.userRepositoryService.findByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // payload ~= token, sub = subject
    // se crea el token con el id y el email del user
    const payload = { sub: user.id, email: user.email };

    // payload + secret key = token
    // luego el cliente recibe el token, lo guarda y lo manda al header
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
