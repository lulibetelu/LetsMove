import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupRepositoryModule } from '../repository/groups/group.repository.module';
import { ImageModule } from '../images/image.module';

@Module({
  imports: [GroupRepositoryModule, ImageModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
