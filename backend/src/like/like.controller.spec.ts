import { Test, TestingModule } from '@nestjs/testing';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LikeRepositoryModule } from '../repository/like/like.repository.module';

describe('LikeController', () => {
  let controller: LikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LikeRepositoryModule],
      controllers: [LikeController],
      providers: [LikeService],
    }).compile();

    controller = module.get<LikeController>(LikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
