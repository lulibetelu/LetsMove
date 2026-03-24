import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
export declare class LoginController {
    private loginService;
    constructor(loginService: LoginService);
    signIn(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
