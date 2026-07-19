import { Test, TestingModule } from '@nestjs/testing';
import { PostActionValidatorService } from './post-action-validator.service';

describe('PostActionValidatorService', () => {
  let service: PostActionValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostActionValidatorService],
    }).compile();

    service = module.get<PostActionValidatorService>(
      PostActionValidatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
