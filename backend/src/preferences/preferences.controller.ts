import { Controller, Post, Body } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesDto } from './dto/preferences.dto';

@Controller('preferences')
export class PreferencesController {
  constructor(private preferencesService: PreferencesService) {}

  @Post('create')
  preferences(@Body() createPreferencesDto: PreferencesDto){
    return this.preferencesService.preferences(createPreferencesDto);
  }

  // @Post('change')
  // modify(@Body()  )
}
