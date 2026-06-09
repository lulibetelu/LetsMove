import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { SavedEventRepositoryService } from './saved-event.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [SavedEventRepositoryService],
  exports: [SavedEventRepositoryService],
})
export class SavedEventRepositoryModule {}
