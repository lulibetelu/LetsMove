import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  @Get()
  @UseGuards(AuthGuard)
  isLogged() {
    return true;
  }
}
