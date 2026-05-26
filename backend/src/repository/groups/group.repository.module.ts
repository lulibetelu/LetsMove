import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { GroupRepositoryService } from './group.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [GroupRepositoryService],
  exports: [GroupRepositoryService],
})
export class GroupRepositoryModule {}