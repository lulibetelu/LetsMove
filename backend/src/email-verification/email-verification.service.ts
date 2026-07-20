import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService } from '../repository/user/user.repository.service';

@Injectable()
export class EmailVerificationService {
  constructor(
    private jwtService: JwtService,
    private userRepositoryService: UserRepositoryService,
  ) {}

  async verifyEmail(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: number;
        email: string;
      }>(token);

      await this.userRepositoryService.markVerified(payload.sub);

      return { message: 'Email verified successfully' };
    } catch {
      throw new UnauthorizedException('Invalid or expired verification token');
    }
  }
}
