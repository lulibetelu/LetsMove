import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryService } from '../repository/user.repository.service';


export class AuthService {
  constructor(private userRepositoryService: UserRepositoryService) {}

  // We've got to change the password when we hash it
  async login(username: string, password: string) {
    const user = await this.userRepositoryService.findByUsername(username);

    if (!user || user.password !== password) {
      throw new UnauthorizedException("You've provided the wrong username.");
    }
    //the Jwt part.
  }
}
