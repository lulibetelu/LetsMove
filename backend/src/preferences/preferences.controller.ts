import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferencesDto } from './dto/create.preferences.dto';
import { DeletePreferencesDto } from './dto/delete.preferences.dto';
import { AuthGuard } from '../authentication/auth.guard';
import { ModifyPreferenceDto } from './dto/modify.preference.dto';

@Controller('preferences')
export class PreferencesController {
  constructor(private preferencesService: PreferencesService) {}
  @Post('create')
  createPreferences(@Body() createPreferencesDto: CreatePreferencesDto) {
    return this.preferencesService.createPreferences(createPreferencesDto);
  }

  @UseGuards(AuthGuard)
  @Delete('update')
  deletePreference(@Body() deletePreferencesDto: DeletePreferencesDto) {
    return this.preferencesService.deletePreferences(deletePreferencesDto);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  modifyPreference(@Body() modifyPreferencesDto: ModifyPreferenceDto) {
    return this.preferencesService.modifyPreference(modifyPreferencesDto);
  }
}
