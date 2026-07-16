import { AiEventType, AiUserType } from './ai-user-type';
import { RegisterService } from '../register/register.service';
import { Injectable } from '@nestjs/common';
import { EventService } from '../event/event.service';

@Injectable()
export class AiDataService {
  constructor(
    private readonly registerService: RegisterService,
    private readonly eventService: EventService,
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

  private async getEventData(eventId: number): Promise<AiEventType> {
    const event = await this.eventService.findOne(eventId);
    return {
      sport: event.sport.name,
      location: event.location?.location,
      description: event.description,
      eventType: event.eventType,
    };
  }

  async generateUserText(userId: number): Promise<string> {
    const userData = await this.getUserData(userId);

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

  async generateEventText(eventId: number): Promise<string> {
    const eventData = await this.getEventData(eventId);
    if (eventData.eventType == 'InPerson') {
      return `This is an in-person ${eventData.sport} event happening at ${eventData.location}. Description: ${eventData.description}.`;
    }
    return `This is an asynchronous ${eventData.sport} event with no fixed location, meaning participants can join remotely or on their own schedule. Description: ${eventData.description}.`;
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
}
