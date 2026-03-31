import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferencesDto } from './dto/create.preferences.dto';
import { DeletePreferencesDto } from './dto/delete.preferences.dto';
import { AuthGuard } from '../authentication/auth.guard';

@Controller('preferences')
export class PreferencesController {
  constructor(private preferencesService: PreferencesService) {}
  @Post('create')
  preferences(@Body() preferencesDto: CreatePreferencesDto) {
    return this.preferencesService.createPreferences(preferencesDto);
  }

  @UseGuards(AuthGuard)
  @Delete('update')
  deletePreference(@Body() updatePreferencesDto: DeletePreferencesDto) {
    return this.preferencesService.deletePreferences(updatePreferencesDto);
  }

  @Post('update')
  modifyPreference(@Body() updatePreferencesDto: DeletePreferencesDto) {
    return this.preferencesService.modifyPreference()
  }
}
