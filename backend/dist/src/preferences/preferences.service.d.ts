import { PreferencesDto } from './dto/preferences.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepositoryService } from '../repository/user.repository.service';
import { SportRepositoryService } from '../repository/sport.repository.service';
export declare class PreferencesService {
    private prismaService;
    private userRepository;
    private sportRepository;
    constructor(prismaService: PrismaService, userRepository: UserRepositoryService, sportRepository: SportRepositoryService);
    preferences(preferencesDto: PreferencesDto): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
}
