import { AiUserType } from './ai-user-type';
import { RegisterService } from '../register/register.service';
import { Injectable } from '@nestjs/common';
import { GeminiService } from './gemini/gemini.service';
import { RecommendationRepositoryService } from '../repository/recommendation/recommendation.repository.service';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly registerService: RegisterService,
    private readonly geminiService: GeminiService,
    private readonly recommendationRepository: RecommendationRepositoryService,
  ) {}
  private async getUserData(userId: number): Promise<AiUserType> {
    const user = await this.registerService.findOne(userId);
    return {
      age: this.calculateAge(user.birthday),
      location: user.homeLocation.location,
      interests: user.preferences.map((preference) => ({
        sport: preference.sport.name,
        level: preference.level,
      })),
    };
  }

  private generateUserText(userData: AiUserType): string {
    const sportsStrings = userData.interests.map(
      (i) => `${i.sport} at a/an ${i.level} level`,
    );
    let sportsList = '';
    if (sportsStrings.length === 2) {
      sportsList = sportsStrings.join(' and ');
    } else if (sportsStrings.length > 2) {
      const lastSport = sportsStrings.pop();
      sportsList = `${sportsStrings.join(', ')}, and ${lastSport} `;
    }
    return `User is ${userData.age} years old and lives in ${userData.location}. They practice the following sports: ${sportsList}`;
  }

  private calculateAge(birthday: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();

    const hasHadBirthdayThisYear =
      today.getMonth() > birthday.getMonth() ||
      (today.getMonth() === birthday.getMonth() &&
        today.getDate() >= birthday.getDate());

    if (!hasHadBirthdayThisYear) {
      age--;
    }

    return age;
  }

  async updateUserEmbedding(userId: number): Promise<number[]> {
    const userData = await this.getUserData(userId);
    const userText: string = this.generateUserText(userData);

    const vector = await this.geminiService.generateEmbedding(userText);
    await this.recommendationRepository.updateUserVector(userId, vector);
    return vector;
  }

  async getFriendRecommendations(userId: number) {
    // 1. Intentamos obtener el vector que ya está guardado en la DB
    let userVector = await this.recommendationRepository.getUserVector(userId);

    // 2. CASO BORDE: ¿Qué pasa si el vector es null?
    // (Ej: un usuario viejo o alguien que se registró y falló Gemini en su momento)
    if (!userVector) {
      // Sincronizamos el vector en ese mismo instante para no dejar al usuario sin servicio
      userVector = await this.updateUserEmbedding(userId);
      // Si sigue sin existir (ej: el usuario no tiene intereses cargados), devolvemos array vacío
      if (!userVector) return [];
    }

    // 3. Ahora que tenemos el userVector seguro, hacemos el match matemático
    return this.recommendationRepository.getUserRecommendations(
      userId,
      userVector,
    );
  }
  async getEventRecommendation(userId: number) {
    let userVector = await this.recommendationRepository.getUserVector(userId);

    if (!userVector) {
      userVector = await this.updateUserEmbedding(userId);
      if (!userVector) return [];
    }

    return this.recommendationRepository.getEventRecommendations(
      userId,
      userVector,
    );
  }
}
