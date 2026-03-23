
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const connectionString =
      'postgres://postgres:themostsecretpasswordintheworld@localhost:5432/letsMoveDB?schema=public';
    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }
}
