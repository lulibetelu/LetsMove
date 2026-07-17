import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RecommendationUser } from '../../ai-recommendation/ai-user-type';

@Injectable()
export class RecommendationRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateVector(userId: number, vector: number[]) {
    const vectorStr = `[${vector.join(',')}]`;

    return this.prismaService.$executeRaw`UPDATE "User"
    SET embedding = ${vectorStr}::vector
    WHERE id = ${userId};`;
  }

  async getVector(userId: number) {
    const result = await this.prismaService.$queryRaw<Vector[]>`
    SELECT embedding FROM "User" WHERE id = ${userId};`;
    // Si el usuario no existe o el embedding está en null, devolvemos null
    if (!result || result.length === 0 || !result[0].embedding) {
      return null;
    }

    const embedding = result[0].embedding;

    // TRAMPA DE PGVECTOR: Si la DB lo devuelve como string "[0.1, 0.2, ...]", lo parseamos a array
    if (typeof embedding === 'string') {
      return embedding.replace('[', '').replace(']', '').split(',').map(Number);
    }

    // Si el driver ya lo parseó automáticamente como array de números, lo devolvemos directo
    return embedding;
  }

  async getUserRecommendations(
    userId: number,
    userVector: number[],
  ): Promise<RecommendationUser[]> {
    const vectorStr = `[${userVector.join(',')}]`;

    const rows = await this.prismaService.$queryRaw<
      RecommendationUser[]
    >`SELECT u.id, u.username, u.birthday, l.location,
      json_agg(json_build_object('sport', s.name, 'level', p.level))
        FILTER (WHERE p.id IS NOT NULL) AS preferences
    FROM "User" u
    JOIN "Location" l ON u."homeLocationId" = l.id
    LEFT JOIN "Preference" p ON p."userId" = u.id
    LEFT JOIN "Sport" s ON p."sportId" = s.id
    WHERE u.id <> ${userId}
      AND u.embedding IS NOT NULL
    GROUP BY u.id, u.username, u.birthday, l.location
    ORDER BY u.embedding <=> ${vectorStr}::vector ASC
    LIMIT 5;
    `;

    return rows.map((row) => ({
      ...row,
      preferences: row.preferences ?? [],
    }));
  }
}

interface Vector {
  embedding: number[] | string;
}
