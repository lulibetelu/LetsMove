import { Controller, Get } from '@nestjs/common';
import { SportsService } from './sports.service';

@Controller()
export class SportsController {
  constructor(private sportsService: SportsService) {}
  @Get()
  getSports() {
    return this.sportsService.getSports();
  }
}
