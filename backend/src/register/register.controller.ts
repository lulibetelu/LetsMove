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
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateRegisterDto } from './dto/update.register.dto';

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
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateRegisterDto: UpdateRegisterDto,
  ) {
    return this.registerService.update(id, updateRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.registerService.remove(id);
  }
}
