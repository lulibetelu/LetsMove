import { Module } from '@nestjs/common';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';
import { PrismaService } from '../prisma/prisma.service';
@Module({
  exports: [],
  controllers: [PreferencesController],
  providers: [PreferencesService, PrismaService],
})
export class PreferencesModule {}
