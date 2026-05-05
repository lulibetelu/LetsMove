import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PreferenceEntity } from '../../preferences/entity/preference.entity';

@Injectable()
export class PreferenceRepositoryService {
  constructor(private prismaService: PrismaService) {}
  async create(preferences: PreferenceEntity[]) {
    return this.prismaService.preference.createMany({
      data: preferences,
      skipDuplicates: true,
    });
  }
  // trae todas las preferencias de un user
  async findByUserId(userId: number) {
    return this.prismaService.preference.findMany({
      where: {
        userId: userId,
      },
    });
  }

  //trae todos los usuarios que prefieren algun deporte
  async findBySportId(sportsId: number[]) {
    return this.prismaService.preference.findMany({
      where: {
        sportId: {
          in: sportsId,
        },
      },
      select: {
        userId: true,
      },
    });
  }

  //trae una combinacion user-sport
  async findUnique(userId: number, sportId: number) {
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

  async update(userId: number, sportId: number, newLevel: string) {
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
