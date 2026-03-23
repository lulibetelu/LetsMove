import { UpdateRegisterDto } from './dto/update-register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
export declare class RegisterService {
    private prismaService;
    constructor(prismaService: PrismaService);
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
    update(id: number, updateRegisterDto: UpdateRegisterDto): import("../../generated/prisma/models").Prisma__UserClient<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    remove(id: number): import("../../generated/prisma/models").Prisma__UserClient<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
