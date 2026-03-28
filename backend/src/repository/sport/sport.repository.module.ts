import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SportRepositoryService } from './sport.repository.service';

@Module({
  imports: [PrismaService],
  providers: [SportRepositoryService],
  exports: [PrismaService],
})
export class SportRepositoryModule {}
