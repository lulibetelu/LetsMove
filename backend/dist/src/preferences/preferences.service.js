"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const user_repository_service_1 = require("../repository/user.repository.service");
const sport_repository_service_1 = require("../repository/sport.repository.service");
let PreferencesService = class PreferencesService {
    prismaService;
    userRepository;
    sportRepository;
    constructor(prismaService, userRepository, sportRepository) {
        this.prismaService = prismaService;
        this.userRepository = userRepository;
        this.sportRepository = sportRepository;
    }
    async preferences(preferencesDto) {
        const user = await this.userRepository.findByUsername(preferencesDto.username);
        if (!user) {
            throw new Error('El usuario no existe');
        }
        const sportsFound = await this.sportRepository.findManyByName(preferencesDto.sports);
        const preferences = sportsFound.map((sport) => ({
            userId: user.id,
            sportId: sport.id,
            level: preferencesDto.level,
        }));
        return this.prismaService.preference.createMany({
            data: preferences,
            skipDuplicates: true,
        });
    }
};
exports.PreferencesService = PreferencesService;
exports.PreferencesService = PreferencesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_repository_service_1.UserRepositoryService,
        sport_repository_service_1.SportRepositoryService])
], PreferencesService);
//# sourceMappingURL=preferences.service.js.map