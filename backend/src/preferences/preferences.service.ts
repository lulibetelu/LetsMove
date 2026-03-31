import { Injectable } from '@nestjs/common';
import { CreatePreferencesDto } from './dto/create.preferences.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepositoryService } from '../repository/user/user.repository.service';
import { SportRepositoryService } from '../repository/sport/sport.repository.service';
import { DeletePreferencesDto } from './dto/delete.preferences.dto';
import { PreferenceRepositoryService } from '../repository/preference/preference.repository.service';

@Injectable()
export class PreferencesService {
  constructor(
    private prismaService: PrismaService,
    private userRepository: UserRepositoryService,
    private sportRepository: SportRepositoryService,
    private preferencesRepository: PreferenceRepositoryService,
  ) {}

  async createPreferences(preferencesDto: CreatePreferencesDto) {
    // una vez que validemos el token con el guard directamente nos pasaria el user.id, por lo
    // que no haria falta hacer esto
    const user = await this.userRepository.findByUsername(
      preferencesDto.username,
    );

    if (!user) {
      throw new Error('El usuario no existe'); // Si usas NestJS, mejor lanzar un NotFoundException
    }

    const sportsFound = await this.sportRepository.findManyByName(
      preferencesDto.sports,
    );

    const preferences = sportsFound.map((sport) => ({
      // en user prisma no devuelve user = 1, sino user = { id: 1}
      userId: user.id,
      sportId: sport.id,
      level: preferencesDto.level,
    }));

    //esta funcion es la unica que usa prismaService, probablemente habria que sacarla de aca
    return this.prismaService.preference.createMany({
      data: preferences,
      skipDuplicates: true,
    });
  }

  async deletePreferences(updatePreferencesDto: DeletePreferencesDto) {
    const user = await this.userRepository.findByUsername(
      updatePreferencesDto.username,
    );

    if (!user) {
      throw new Error('El usuario no existe'); // Si usas NestJS, mejor lanzar un NotFoundException
    }

    const sportsFound = await this.sportRepository.findManyByName(
      updatePreferencesDto.sports,
    );

    const sportsId = sportsFound.map((sport) => sport.id);

    return this.preferencesRepository.deleteMany(user.id, sportsId);
  }

  async modifyPreference(updatePreferencesDto: DeletePreferencesDto){
    const user = await this.userRepository.findByUsername(
      updatePreferencesDto.username,
    );

    const sport = await this.sportRepository.findOneByName(
      updatePreferencesDto.sports,
    );
    
    return this.preferencesRepository.modify(user.id, sport.id, )
    
    
    
    
  }
}
