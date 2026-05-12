import { Test, TestingModule } from '@nestjs/testing';
import { EventSignUpController } from './event-sign-up.controller';
import { EventSignUpService } from './event-sign-up.service';

describe('EventSignUpController', () => {
  let controller: EventSignUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventSignUpController],
      providers: [EventSignUpService],
    }).compile();

    controller = module.get<EventSignUpController>(EventSignUpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
