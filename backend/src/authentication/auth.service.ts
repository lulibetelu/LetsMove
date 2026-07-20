import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { UserRepositoryService } from '../repository/user/user.repository.service';

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor(
    private jwtService: JwtService,
    private userRepositoryService: UserRepositoryService,
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyGoogleUserExists(idToken: string) {
    let payload: TokenPayload | undefined;
    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch {
      throw new UnauthorizedException('Invalid Google token');
    }

    if (!payload?.email) {
      throw new UnauthorizedException('Invalid Google token');
    }

    const email = payload.email;
    const name = payload.name;

    const user = await this.userRepositoryService.findByEmail(email);

    if (user) {
      const tokenPayload = {
        sub: user.id,
        email: user.email,
        username: user.username,
      };
      return {
        exists: true,
        access_token: await this.jwtService.signAsync(tokenPayload),
      };
    }

    return { exists: false, email, name };
  }
}
