import { PrismaService } from '../prisma/prisma.service';
export declare class UserRepositoryService {
    private prismaService;
    constructor(prismaService: PrismaService);
    findByUsername(username: string): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    } | null>;
    findById(userId: number): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    } | null>;
    findByEmail(userEmail: string): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    } | null>;
}
