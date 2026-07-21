import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../../posts/dto/create-post.dto';

@Injectable()
export class PostsRepositoryService {
  constructor(private prismaService: PrismaService) {}

  async create(
    userId: number,
    createPostDto: CreatePostDto,
    sportMatchByUser: Record<number, number>,
    imageIds: number[],
  ) {
    // 1. creo el post
    const newPost = await this.prismaService.post.create({
      data: {
        content: createPostDto.content,
        userId: userId,
      },
    });
    // 2. creo el postSport, guardando los sports de los que habla el post
    await this.prismaService.postSport.createMany({
      data: createPostDto.selectedSportsId.map((sportId) => ({
        postId: newPost.id,
        sportId,
      })),
    });
    // 3. a todos los usuarios que les interesa alguno de esos deportes, se les agrega una tupla en postScore
    await this.prismaService.postScore.createMany({
      data: Object.entries(sportMatchByUser).map(([userId, sportMatch]) => ({
        userId: Number(userId),
        postId: newPost.id,
        sportMatch,
      })),
    });

    if (imageIds.length > 0) {
      await this.prismaService.imagePost.createMany({
        data: imageIds.map((imageId) => ({
          postId: newPost.id,
          imageId,
        })),
      });
    }

    return newPost;
  }

  async findAll(currentUserId: number, page: number = 1, search?: string) {
    const where = search
      ? {
          OR: [
            { content: { contains: search, mode: 'insensitive' as const } },
            {
              user: {
                username: { contains: search, mode: 'insensitive' as const },
              },
            },
          ],
        }
      : {};

    const [posts, authorInteractions] = await Promise.all([
      this.prismaService.post.findMany({
        include: {
          postScore: {
            where: { userId: currentUserId },
            select: { sportMatch: true },
          },
          postsLiked: {
            where: { userId: currentUserId },
            select: { id: true },
          },
          postsDisliked: {
            where: { userId: currentUserId },
            select: { id: true },
          },
          postSport: {
            select: { sportId: true },
          },
          user: {
            select: { username: true },
          },
          imagePosts: {
            include: {
              image: {
                select: { id: true, url: true },
              },
            },
          },
        },
        where,
      }),
      // agrupo en base a cada usuario que creó un post y me fijo cuantos de esos posts el current id likeo o dislikeo
      this.prismaService.$queryRaw<
        { authorId: number; likeCount: number; dislikeCount: number }[]
      >`
        SELECT 
          p."userId" as "authorId",
          COUNT(CASE WHEN pl."userId" = ${currentUserId} THEN 1 END) as "likeCount",
          COUNT(CASE WHEN pd."userId" = ${currentUserId} THEN 1 END) as "dislikeCount"
        FROM "Post" p
        LEFT JOIN "PostLiked" pl ON pl."postId" = p.id AND pl."userId" = ${currentUserId}
        LEFT JOIN "PostDisliked" pd ON pd."postId" = p.id AND pd."userId" = ${currentUserId}
        WHERE p."userId" != ${currentUserId}
        GROUP BY p."userId"
        HAVING 
          COUNT(CASE WHEN pl."userId" = ${currentUserId} THEN 1 END) > 0
          OR COUNT(CASE WHEN pd."userId" = ${currentUserId} THEN 1 END) > 0
      `,
    ]);

    //creo un mapa con (autor -> afinidad del current user con el autor)
    const affinityMap: Map<number, number> = new Map(
      authorInteractions.map(({ authorId, likeCount, dislikeCount }) => {
        const affinity =
          Math.log(Number(likeCount) + 1) -
          (Math.exp(Number(dislikeCount)) - 1) * 2;
        return [authorId, affinity];
      }),
    );

    const scored = posts.map((post) => {
      // se hace toda esa division de numeros para pasar de milisegundos a dias
      const daysFromCreation =
        (Date.now() - new Date(post.createdAt).getTime()) /
        (1000 * 60 * 60 * 24);

      // sumo uno a daysFromCreation para evitar que si se creo hoy se divida por cero
      const seniority = 1 / (daysFromCreation + 1);

      const sportMatch = post.postScore[0]?.sportMatch ?? 0;

      const authorAffinity = affinityMap.get(post.userId) ?? 0;

      const score = seniority + sportMatch * 3 + authorAffinity * 4;

      return { ...post, score };
    });

    scored.sort((a, b) => b.score - a.score);

    const start = (page - 1) * 50;

    return scored.slice(start, start + 50);
  }

  async findUnique(postId: number) {
    return this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        imagePosts: {
          include: {
            image: {
              select: { id: true, url: true },
            },
          },
        },
      },
    });
  }

  async delete(postId: number) {
    const deletedPost = await this.prismaService.post.delete({
      where: {
        id: postId,
      },
    });

    await this.prismaService.postSport.deleteMany({
      where: {
        postId: postId,
      },
    });

    return deletedPost;
  }

  async findPostsFromUser(
    currentUserId: number,
    userId: number,
    page: number = 1,
  ) {
    return this.prismaService.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      skip: (page - 1) * 50,
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        postsLiked: {
          where: { userId: currentUserId },
          select: { id: true },
        },
        postsDisliked: {
          where: { userId: currentUserId },
          select: { id: true },
        },
        postSport: {
          select: { sportId: true },
        },
        imagePosts: {
          include: {
            image: {
              select: { id: true, url: true },
            },
          },
        },
      },
    });
  }
}
