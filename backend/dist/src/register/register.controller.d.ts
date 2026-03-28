import { RegisterService } from './register.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
export declare class RegisterController {
    private readonly registerService;
    constructor(registerService: RegisterService);
    create(createRegisterDto: RegisterDto): Promise<RegisterDto>;
    findAll(): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    } | null>;
    update(id: string, updateRegisterDto: UpdateRegisterDto): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        biography: string | null;
    }>;
}
