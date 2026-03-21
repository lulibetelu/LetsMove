import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { RegisterService } from '../services/register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  registerUser(@Body() registerDto: RegisterDto) {
    this.registerService.createUser(registerDto);
  }
}
