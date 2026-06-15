import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LocationRepositoryService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.location.findMany({
      orderBy: { location: 'asc' },
    });
  }

  search(query: string) {
    return this.prismaService.location.findMany({
      where: {
        location: {
          // hace un LIKE %query% en SQL
          contains: query,
          // para que no le importen las mayusculas
          mode: 'insensitive',
        },
      },
      orderBy: { location: 'asc' },
    });
  }
}
