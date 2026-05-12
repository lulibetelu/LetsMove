import { Test, TestingModule } from '@nestjs/testing';
import { EventSignUpService } from './event-sign-up.service';

describe('EventSignUpService', () => {
  let service: EventSignUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventSignUpService],
    }).compile();

    service = module.get<EventSignUpService>(EventSignUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
