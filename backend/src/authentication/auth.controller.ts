import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

interface googleBody {
  token: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @Get()
  @UseGuards(AuthGuard)
  isLogged() {
    return true;
  }

  @Post()
  async verifyGoogleUserExists(@Body() body: googleBody) {
    return this.authService.verifyGoogleUserExists(body.token);
  }
}
