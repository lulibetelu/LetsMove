import { PreferencesService } from './preferences.service';
import { PreferencesDto } from './dto/preferences.dto';
export declare class PreferencesController {
    private preferencesService;
    constructor(preferencesService: PreferencesService);
    preferences(createPreferencesDto: PreferencesDto): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
}
