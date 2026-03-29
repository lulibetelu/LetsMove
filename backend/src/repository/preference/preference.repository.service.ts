import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PreferenceRepositoryService {
  constructor(private prismaService: PrismaService) {}

  async findByUserId(userId: number) {
    return this.prismaService.preference.findMany({
      where: {
        userId: userId,
      },
    });
  }
  
  async findBySportId(sportId: number) {
    return this.prismaService.preference.findMany({
      where: {
        sportId: sportId,
      },
    });
  }

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
}