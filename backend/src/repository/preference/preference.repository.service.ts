import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PreferenceRepositoryService {
  constructor(private prismaService: PrismaService) {}

  // trae todas las preferencias de un user
  async findByUserId(userId: number) {
    return this.prismaService.preference.findMany({
      where: {
        userId: userId,
      },
    });
  }

  //trae todos los usuarios que prefieren un deporte
  async findBySportId(sportId: number) {
    return this.prismaService.preference.findMany({
      where: {
        sportId: sportId,
      },
    });
  }

  //trae una combinacion user-sport
  async findParticularPreference(userId: number, sportId: number) {
    return this.prismaService.preference.findUnique({
      where: {
        userId_sportId: {
          userId: userId,
          sportId: sportId,
        },
      },
    });
  }

  //borra una o mas preferencias
  async deleteMany(userId: number, sportIds: number[]) {
    return this.prismaService.preference.deleteMany({
      where: {
        userId: userId,
        sportId: {
          in: sportIds,
        },
      },
    });
  }

  async modify(userId: number, sportId: number, newLevel: string) {
    return this.prismaService.preference.update({
      where: {
        userId_sportId: {
          userId: userId,
          sportId: sportId,
        },
      },
      data: {
        level: newLevel,
      },
    });
  }
}
