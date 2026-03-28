import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from '../../register/dto/register.dto';
import { UpdateRegisterDto } from '../../register/dto/update-register.dto';
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
    createUser(registerDto: RegisterDto): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    }[]>;
    update(id: number, updateRegisterDto: UpdateRegisterDto): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    }>;
    removeById(id: number): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    }>;
}
