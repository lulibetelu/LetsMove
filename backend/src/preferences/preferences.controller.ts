import { Controller, Post, Body, Delete } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferencesDto } from './dto/create.preferences.dto';
import { UpdatePreferencesDto } from './dto/update.preferences.dto';

@Controller('preferences')
export class PreferencesController {
  constructor(private preferencesService: PreferencesService) {}

  @Post('create')
  preferences(@Body() preferencesDto: CreatePreferencesDto) {
    return this.preferencesService.createPreferences(preferencesDto);
  }

  @Delete('update')
  deletePreference(@Body() updatePreferencesDto: UpdatePreferencesDto) {
    return this.preferencesService.deletePreference(updatePreferencesDto);
  }
}
