import { IsBoolean, IsInt } from 'class-validator';

export class Member {
  @IsInt()
  memberId: number;

  @IsBoolean()
  isAdmin: boolean;
}
