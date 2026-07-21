import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateRegisterDto } from './dto/update.register.dto';
import { AuthGuard } from '../authentication/auth.guard';
import type { Request } from 'express';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  create(@Body() createRegisterDto: RegisterDto) {
    return this.registerService.create(createRegisterDto);
  }

  @Get()
  async findAll() {
    const promise = await this.registerService.findAll();

    if (!promise || promise.length === 0)
      throw new NotFoundException('user not found');
    return promise;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const promise = await this.registerService.findOne(id);
    if (!promise) {
      throw new NotFoundException('Not Found');
    }
    return promise;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateRegisterDto: UpdateRegisterDto,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;
    if (userId !== id) {
      throw new UnauthorizedException('You can only update your own profile');
    }
    return this.registerService.update(id, updateRegisterDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', new ParseIntPipe()) id: number, @Req() req: Request) {
    const userId = req.user.sub;
    if (userId !== id) {
      throw new UnauthorizedException('You can only delete your own account');
    }
    return this.registerService.remove(id);
  }
}
