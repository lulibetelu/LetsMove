import { Module } from '@nestjs/common';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepositoryService } from '../repository/user.repository.service';
import { SportRepositoryService } from '../repository/sport.repository.service';
@Module({
  exports: [],
  controllers: [PreferencesController],
  providers: [
    PreferencesService,
    PrismaService,
    UserRepositoryService,
    SportRepositoryService,
  ],
})
export class PreferencesModule {}
