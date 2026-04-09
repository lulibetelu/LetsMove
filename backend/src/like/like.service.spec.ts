import { Test, TestingModule } from '@nestjs/testing';
import { LikeService } from './like.service';
import { LikeRepositoryModule } from '../repository/like/like.repository.module';

describe('LikeService', () => {
  let service: LikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeService],
      imports: [LikeRepositoryModule],
    }).compile();

    service = module.get<LikeService>(LikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
