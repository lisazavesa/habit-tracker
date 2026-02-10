import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { HabitLogsService } from './habits-logs/habits-logs.servise';

@Module({
  controllers: [HabitsController],
  providers: [HabitsService, HabitLogsService]
})
export class HabitsModule {}
