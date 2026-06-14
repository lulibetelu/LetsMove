import { Injectable } from '@nestjs/common';
import { LocationRepositoryService } from '../repository/location/location.repository.service';

@Injectable()
export class LocationService {
  constructor(private locationRepository: LocationRepositoryService) {}

  async findAll() {
    return this.locationRepository.findAll();
  }

  async search(query: string) {
    return this.locationRepository.search(query);
  }
}
