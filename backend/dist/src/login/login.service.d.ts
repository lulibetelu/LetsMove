import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService } from '../repository/user/user.repository.service';
export declare class LoginService {
    private prismaService;
    private jwtService;
    private userRepositoryService;
    constructor(prismaService: PrismaService, jwtService: JwtService, userRepositoryService: UserRepositoryService);
    login(email: string, pass: string): Promise<{
        access_token: string;
    }>;
}
