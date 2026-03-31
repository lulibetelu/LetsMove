import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PreferenceRepositoryService } from './preference.repository.service';

@Module({
  imports: [PrismaModule],
  providers: [PreferenceRepositoryService],
  exports: [PreferenceRepositoryService],
})
export class PreferenceRepositoryModule {}
