import { Injectable } from '@nestjs/common';
import { PreferencesDto } from './dto/preferences.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PreferencesService {
  constructor(private prismaService: PrismaService) {}

  async preferences(preferencesDto: PreferencesDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: preferencesDto.username,
      },
      select: { id: true },
    });

    if (!user) {
      throw new Error('El usuario no existe'); // Si usas NestJS, mejor lanzar un NotFoundException
    }

    const sportsFound = await this.prismaService.sport.findMany({
      where: {
        name: {
          in: preferencesDto.sports,
        },
      },
      select: { id: true },
    });

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
