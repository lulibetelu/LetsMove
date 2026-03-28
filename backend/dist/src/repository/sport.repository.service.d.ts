import { PrismaService } from '../prisma/prisma.service';
export declare class SportRepositoryService {
    private prismaService;
    constructor(prismaService: PrismaService);
    findManyByName(sports: string[]): Promise<{
        id: number;
        name: string;
    }[]>;
    findOneByName(sport: string): Promise<{
        id: number;
        name: string;
    } | null>;
    findOneById(sportId: number): Promise<{
        id: number;
        name: string;
    } | null>;
}
