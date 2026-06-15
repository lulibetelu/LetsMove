import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { SearchLocationDto } from './dto/search-location.dto';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  // a proposito no tienen guard, porque hay que usarlos en el register
  @Get()
  async findAll() {
    const locations = await this.locationService.findAll();
    if (!locations) throw new NotFoundException();
    return locations;
  }

  @Get('search')
  async search(@Query() searchDto: SearchLocationDto) {
    const locations = await this.locationService.search(searchDto.q ?? '');
    if (!locations) throw new NotFoundException();
    return locations;
  }
}
