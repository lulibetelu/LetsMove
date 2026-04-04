import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import type { Request } from 'express';
import { PreferencesService } from './preferences.service';
import { CreatePreferencesDto } from './dto/create.preferences.dto';
import { DeletePreferencesDto } from './dto/delete.preferences.dto';
import { AuthGuard } from '../authentication/auth.guard';
import { ModifyPreferenceDto } from './dto/modify.preference.dto';

@Controller('preferences')
export class PreferencesController {
  constructor(private preferencesService: PreferencesService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(
    @Req() req: Request,
    @Body() createPreferencesDto: CreatePreferencesDto,
  ) {
    const userId = req.user.sub;
    return this.preferencesService.create(userId, createPreferencesDto);
  }

  @UseGuards(AuthGuard)
  @Delete('update')
  delete(
    @Req() req: Request,
    @Body() deletePreferencesDto: DeletePreferencesDto,
  ) {
    const userId = req.user.sub;
    return this.preferencesService.delete(userId, deletePreferencesDto);
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  update(
    @Req() req: Request,
    @Body() modifyPreferencesDto: ModifyPreferenceDto,
  ) {
    const userId = req.user.sub;
    return this.preferencesService.update(userId, modifyPreferencesDto);
  }
}
