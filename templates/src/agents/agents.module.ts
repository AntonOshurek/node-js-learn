import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}
