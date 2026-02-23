import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { HabitsService } from './habits.service';
import { HabitLogsService } from './habits-logs/habits-logs.servise';
import { Habit, HabitLog } from '@prisma/client';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { UpsertHabitLogDto } from './dto/upsert-habit-log.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('habits')
export class HabitsController {
  constructor(
    private readonly habitsService: HabitsService,
    private readonly logsService: HabitLogsService,
  ) {}

  @Get()
  async findAllHabits(@Request() req): Promise<Habit[]> {
    const userId = req.user.userId;
    const habits = await this.habitsService.getAll(userId);
    return habits;
  }

  @Post()
  async createHabit(
    @Request() req,
    @Body() dto: CreateHabitDto,
  ): Promise<Habit> {
    const userId = req.user.userId;
    const habit = await this.habitsService.create(
      dto.title,
      userId,
      dto.description,
    );
    return habit;
  }

  @Get('id')
  async findHabitById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Habit | null> {
    const userId = req.user.userId;
    const habit = await this.habitsService.findById(id, userId);
    return habit;
  }

  @Patch(':id')
  async updateHabit(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHabitDto,
  ): Promise<Habit | null> {
    const userId = req.user.userId;
    const updateHabit = await this.habitsService.update(id, userId, dto);
    return updateHabit;
  }

  @Delete(':id')
  async deleteHabit(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    const userId = req.user.userId;
    await this.habitsService.delete(id, userId);
  }

  @Post(':id/logs')
  async addHabitLog(
    @Request() req,
    @Param('id', ParseIntPipe) habitId: number,
    @Body() dto: UpsertHabitLogDto,
  ): Promise<HabitLog> {
    const userId = req.user.userId;
    const habit = await this.habitsService.findById(habitId, userId);

    if (!habit) {
      throw new Error('habit not found');
    }

    const log = await this.logsService.upsert(habitId, dto.date, dto.status);
    return log;
  }

  @Get(':id/logs')
  async getHabitLogs(
    @Request() req,
    @Param('id', ParseIntPipe) habitId: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ): Promise<HabitLog[]> {
    const userId = req.user.userId;
    const habit = await this.habitsService.findById(habitId, userId);

    if (!habit) {
      throw new Error('habit not found');
    }

    const logs = await this.logsService.getByHabitId(habitId, from, to);
    return logs;
  }
}
