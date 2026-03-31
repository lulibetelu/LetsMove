import { Controller, Post, Body, Delete, UseGuards, Req } from '@nestjs/common';
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
  createPreferences(
    @Req() req: Request,
    @Body() createPreferencesDto: CreatePreferencesDto,
  ) {
    const userId = req.user.id;
    return this.preferencesService.createPreferences(
      userId,
      createPreferencesDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('update')
  deletePreference(
    @Req() req: Request,
    @Body() deletePreferencesDto: DeletePreferencesDto,
  ) {
    const userId = req.user.id;
    return this.preferencesService.deletePreferences(
      userId,
      deletePreferencesDto,
    );
  }

  @UseGuards(AuthGuard)
  @Post('update')
  modifyPreference(
    @Req() req: Request,
    @Body() modifyPreferencesDto: ModifyPreferenceDto,
  ) {
    const userId = req.user.id;
    return this.preferencesService.modifyPreference(
      userId,
      modifyPreferencesDto,
    );
  }
}
