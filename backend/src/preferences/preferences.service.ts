import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePreferencesDto } from './dto/create.preferences.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SportRepositoryService } from '../repository/sport/sport.repository.service';
import { DeletePreferencesDto } from './dto/delete.preferences.dto';
import { PreferenceRepositoryService } from '../repository/preference/preference.repository.service';
import { ModifyPreferenceDto } from './dto/modify.preference.dto';

@Injectable()
export class PreferencesService {
  constructor(
    private prismaService: PrismaService,
    private sportRepository: SportRepositoryService,
    private preferencesRepository: PreferenceRepositoryService,
  ) {}

  async createPreferences(
    userId: number,
    preferencesDto: CreatePreferencesDto,
  ) {
    const sportsFound = await this.sportRepository.findManyByName(
      preferencesDto.sports,
    );

    const preferences = sportsFound.map((sport) => ({
      // en user prisma no devuelve user = 1, sino user = { id: 1}
      userId: userId,
      sportId: sport.id,
      level: preferencesDto.level,
    }));

    //esta funcion es la unica que usa prismaService, probablemente habria que sacarla de aca
    return this.prismaService.preference.createMany({
      data: preferences,
      skipDuplicates: true,
    });
  }

  async deletePreferences(
    userId: number,
    updatePreferencesDto: DeletePreferencesDto,
  ) {
    const sportsFound = await this.sportRepository.findManyByName(
      updatePreferencesDto.sports,
    );

    const sportsId = sportsFound.map((sport) => sport.id);

    return this.preferencesRepository.deleteMany(userId, sportsId);
  }

  async modifyPreference(
    userId: number,
    modifyPreferenceDto: ModifyPreferenceDto,
  ) {
    const sport = await this.sportRepository.findOneByName(
      modifyPreferenceDto.sport,
    );

    if (!sport) throw new NotFoundException();

    return this.preferencesRepository.modify(
      userId,
      sport.id,
      modifyPreferenceDto.level,
    );
  }
}
