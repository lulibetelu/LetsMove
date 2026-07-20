import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService } from '../repository/user/user.repository.service';

@Injectable()
export class PasswordResetService {
  constructor(
    private jwtService: JwtService,
    private userRepositoryService: UserRepositoryService,
  ) {}

  async requestResetToken(email: string) {
    const user = await this.userRepositoryService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('No user found with that email');
    }

    const token = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      { expiresIn: '15m' },
    );

    return { token, user };
  }

  async verifyResetToken(token: string) {
    try {
      await this.jwtService.verifyAsync<{
        sub: number;
        email: string;
      }>(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired reset token');
    }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: number;
        email: string;
      }>(token);

      await this.userRepositoryService.updatePassword(payload.sub, newPassword);

      return { message: 'Password updated successfully' };
    } catch {
      throw new UnauthorizedException('Invalid or expired reset token');
    }
  }
}
