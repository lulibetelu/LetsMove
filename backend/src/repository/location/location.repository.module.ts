import { Module } from '@nestjs/common';
import { LocationRepositoryService } from './location.repository.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LocationRepositoryService],
  exports: [LocationRepositoryService],
})
export class LocationRepositoryModule {}
