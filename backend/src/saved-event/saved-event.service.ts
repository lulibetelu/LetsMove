import { Injectable } from '@nestjs/common';
import { SavedEventRepositoryService } from '../repository/savedEvent/saved-event.repository.service';

@Injectable()
export class SavedEventService {
  constructor(
    private savedEventRepositoryService: SavedEventRepositoryService,
  ) {}

  save(userId: number, eventId: number) {
    return this.savedEventRepositoryService.create(userId, eventId);
  }

  unsave(userId: number, eventId: number) {
    return this.savedEventRepositoryService.remove(userId, eventId);
  }

  findAllFromUser(userId: number) {
    return this.savedEventRepositoryService.findAllFromUser(userId);
  }

  findOne(userId: number, eventId: number) {
    return this.savedEventRepositoryService.findOne(userId, eventId);
  }
}
