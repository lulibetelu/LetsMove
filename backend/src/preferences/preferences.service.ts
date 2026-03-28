import { Injectable } from '@nestjs/common';
import { PreferencesDto } from './dto/preferences.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepositoryService } from '../repository/user/user.repository.service';
import { SportRepositoryService } from '../repository/sport/sport.repository.service';

@Injectable()
export class PreferencesService {
  constructor(
    private prismaService: PrismaService,
    private userRepository: UserRepositoryService,
    private sportRepository: SportRepositoryService,
  ) {}

  async preferences(preferencesDto: PreferencesDto) {
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

    return this.prismaService.preference.createMany({
      data: preferences,
      skipDuplicates: true,
    });
  }
}
