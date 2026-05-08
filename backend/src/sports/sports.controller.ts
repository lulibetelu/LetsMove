import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { SportsService } from './sports.service';
import { AuthGuard } from '../authentication/auth.guard';

@Controller('sports')
export class SportsController {
  constructor(private sportsService: SportsService) {}
  @UseGuards(AuthGuard)
  @Get()
  async getSports() {
    const promise = await this.sportsService.getSports();

    if (!promise) throw new NotFoundException();
    return promise;
  }
}
