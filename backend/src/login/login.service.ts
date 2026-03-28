import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, pass: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    console.log(user);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Llegue aca!');
    }
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
