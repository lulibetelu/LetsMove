import { Controller, Get, UseGuards } from '@nestjs/common';
import { SportsService } from './sports.service';
import { AuthGuard } from '../authentication/auth.guard';

@Controller('sports')
export class SportsController {
  constructor(private sportsService: SportsService) {}
  @UseGuards(AuthGuard)
  @Get()
  getSports() {
    return this.sportsService.getSports();
  }
}
