import { UpdateRegisterDto } from './dto/update-register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { UserRepositoryService } from '../repository/user/user.repository.service';
export declare class RegisterService {
    private prismaService;
    private userRepositoryService;
    constructor(prismaService: PrismaService, userRepositoryService: UserRepositoryService);
    create(registerDto: RegisterDto): Promise<RegisterDto>;
    findAll(): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    } | null>;
    update(id: number, updateRegisterDto: UpdateRegisterDto): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    }>;
}
