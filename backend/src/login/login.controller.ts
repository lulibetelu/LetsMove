import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '../authentication/auth.guard';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}
  @Post()
  signIn(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return this.loginService.login(loginDto.email, loginDto.password);
  }

  @Get()
  @UseGuards(AuthGuard)
  testThing() {
    return "You've accessed the secret";
  }
}
