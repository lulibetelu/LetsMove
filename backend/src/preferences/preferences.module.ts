import { Module } from '@nestjs/common';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepositoryService } from '../repository/user/user.repository.service';
import { SportRepositoryService } from '../repository/sport/sport.repository.service';
import { PreferenceRepositoryService } from '../repository/preference/preference.repository.service';

@Module({
  exports: [],
  controllers: [PreferencesController],
  providers: [
    PreferencesService,
    PrismaService,
    UserRepositoryService,
    SportRepositoryService,
    PreferenceRepositoryService,
  ],
})
export class PreferencesModule {}
