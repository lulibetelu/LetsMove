import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ExportSportDto } from '../../sports/dto/export-sport.dto';
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
  async findOneByName(sport: string) {
    return this.prismaService.sport.findUnique({
      where: {
        name: sport,
      },
    });
  }
  async findOneById(sportId: number) {
    return this.prismaService.sport.findUnique({
      where: {
        id: sportId,
      },
    });
  }
  findAll() {
    //return this.prismaService.sport.findMany();
    //return ['Futbol', 'Tenis', 'Padel', 'Rugby', 'Baloncesto', 'Voley'];
    const sports: ExportSportDto[] = [
      { sportId: 1, name: 'Futbol' },
      { sportId: 2, name: 'Basquetbol' },
      { sportId: 3, name: 'Tenis' },
      { sportId: 4, name: 'Padel' },
      { sportId: 5, name: 'Rugby' },
      { sportId: 6, name: 'Voley' },
    ];
    return sports;
  }
}
