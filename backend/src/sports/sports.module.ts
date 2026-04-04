import { Module } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportRepositoryModule } from '../repository/sport/sport.repository.module';
import { SportsController } from './sports.controller';

@Module({
  imports: [SportRepositoryModule],
  controllers: [SportsController],
  providers: [SportsService],
  exports: [SportsService],
})
export class SportsModule {}
