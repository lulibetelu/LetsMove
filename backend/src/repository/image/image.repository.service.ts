import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ImageRepositoryService {
  constructor(private prismaService: PrismaService) {}
  getOne(id: number) {
    return this.prismaService.image.findUnique({
      where: { id: id },
    });
  }
  create(data: Prisma.ImageCreateInput) {
    return this.prismaService.image.create({ data });
  }
}
