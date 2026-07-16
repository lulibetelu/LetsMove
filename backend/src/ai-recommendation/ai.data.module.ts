import { Module } from '@nestjs/common';
import { RegisterModule } from '../register/register.module';
import { EventModule } from '../event/event.module';
import { AiDataService } from './ai.data.service';

@Module({
  imports: [RegisterModule, EventModule],
  exports: [AiDataService],
})
export class AiDataModule {}
