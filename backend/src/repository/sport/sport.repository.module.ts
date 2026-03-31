import { Module } from '@nestjs/common';
import { SportRepositoryService } from './sport.repository.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SportRepositoryService],
  exports: [SportRepositoryService],
})
export class SportRepositoryModule {}
