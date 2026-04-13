import { Injectable } from '@nestjs/common';
import { SportRepositoryService } from '../repository/sport/sport.repository.service';

@Injectable()
export class SportsService {
  constructor(private sportsRepository: SportRepositoryService) {}
  getSports() {
    return { sports: this.sportsRepository.findAll() };
  }
}
