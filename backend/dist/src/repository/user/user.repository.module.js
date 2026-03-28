"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const user_repository_service_1 = require("./user.repository.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let UserRepositoryModule = class UserRepositoryModule {
};
exports.UserRepositoryModule = UserRepositoryModule;
exports.UserRepositoryModule = UserRepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [user_repository_service_1.UserRepositoryService],
        exports: [user_repository_service_1.UserRepositoryService],
    })
], UserRepositoryModule);
//# sourceMappingURL=user.repository.module.js.map