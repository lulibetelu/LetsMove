import { Injectable } from '@nestjs/common';
import { SportRepositoryService } from '../repository/sport/sport.repository.service';

@Injectable()
export class SportsService {
  constructor(private sportsRepocitory: SportRepositoryService) {}
  async getSports() {
    return this.sportsRepocitory.findAll();
  }
}
