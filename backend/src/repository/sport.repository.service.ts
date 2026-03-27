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
      select: { id: true },
    });
  }
}
