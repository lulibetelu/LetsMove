import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class SportRepositoryService {
  constructor(private prismaService: PrismaService) {}

  async findManyByName(sports: string[]) {
    return this.prismaService.sport.findMany({
      where: {
        name: {
          in: sports,
        },
      },
    });
  }
  async findOneByName(sport: string){
    return this.prismaService.sport.findUnique({
      where: {
        name: sport,
      },
    });
  }
  async findOneById(sportId: number){
    return this.prismaService.sport.findUnique({
      where: {
        id: sportId,
      },
    });
  }
}
