import { 
    Controller, 
    Get, Post, Patch, Delete, 
    Body, Param, ParseIntPipe, Query, Request, UseGuards
} from '@nestjs/common';

import { HabitsService } from './habits.service';
import { HabitLogsService } from './habits-logs/habits-logs.servise';
import { Habit, HabitLog } from '@prisma/client';
import { CreateHabitDto } from "./dto/create-habit.dto";
import { UpdateHabitDto } from "./dto/update-habit.dto";
import { UpsertHabitLogDto } from "./dto/upsert-habit-log.dto";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


type ApiResponse<T> = {
        success: boolean,
        data: T | null,
        error: string | null
    }



@UseGuards(JwtAuthGuard)
@Controller('habits')
export class HabitsController {
    constructor(
        private readonly habitsService: HabitsService,
        private readonly logsService: HabitLogsService,
    ) {}

    @Get()
    async findAllHabits(@Request() req): Promise<ApiResponse<Habit[]>> {
        const userId = req.user.userId
        const habits = await this.habitsService.getAll(userId)

        return {
            success: true,
            data: habits,
            error: null,
        }
    }

    @Post()
    async createHabit(
        @Request() req,
        @Body() dto: CreateHabitDto): Promise<ApiResponse<Habit>> {
        const userId = req.user.userId

        const habit = await this.habitsService.create(dto.title, userId, dto.description)

        return {
            success: true,
            data: habit,
            error: null,
        }
    }

    @Get('id')
    async findHabitById(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
    ): Promise<ApiResponse<Habit>> {
        const userId = req.user.userId
        const habit = await this.habitsService.findById(id, userId)

        if (!habit) {
            return {
                success: false,
                data: null,
                error: 'habit not found',
            }
        }

        return {
            success: true,
            data: habit,
            error: null,
        }
    }

    @Patch(':id')
    async updateHabit(
        @Request() req,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateHabitDto,
    ): Promise<ApiResponse<Habit>> {
        const userId = req.user.userId

        const updateHabit = await this.habitsService.update(id, userId, dto)

        if (!updateHabit) {
            return {
                success: false,
                data: null,
                error: "habit not found",
            };
        }

        return {
            success: true,
            data: updateHabit,
            error: null,
        }
    }

    @Delete(':id')
    async deleteHabit(
        @Param('id', ParseIntPipe) id: number,
        @Request() req
    ): Promise<ApiResponse<null>> {
        const userId = req.user.userId
        const deleted = await this.habitsService.delete(id, userId)

        if(!deleted) {
            return {
                success: false,
                data: null,
                error: "failed delete",
            };
        }

        return {
            success: true,
            data: null,
            error: null,
        }

    }

    @Post(':id/logs')
    async addHabitLog(
        @Request() req,
        @Param('id', ParseIntPipe) habitId: number,
        @Body() dto: UpsertHabitLogDto,
    ): Promise<ApiResponse<HabitLog>> {
        const userId = req.user.userId
        const habit = await this.habitsService.findById(habitId, userId)

        if (!habit) {
            return {
                success: false,
                data: null,
                error: "habit not found",
            };
        }

        const log = await this.logsService.upsert(habitId, dto.date, dto.status)

        return {
            success: true,
            data: log,
            error: null,
        }
    }

    @Get(':id/logs')
    async getHabitLogs(
        @Request() req,
        @Param('id', ParseIntPipe) habitId: number,
        @Query('from') from?: string,
        @Query('to') to?: string,
    ): Promise<ApiResponse<HabitLog[]>> {
        const userId = req.user.userId
        const habit = await this.habitsService.findById(habitId, userId)

        if (!habit) {
            return {
                success: false,
                data: null,
                error: "habit not found",
            };
        }

        if (from !== undefined) {
            return {
                success: false,
                data: null,
                error: "from - error",
            };
        }

        if (to !== undefined) {
            return {
                success: false,
                data: null,
                error: "to - error",
            };
        }

        const logs = await this.logsService.getByHabitId(habitId, from, to)

        return {
            success: true,
            data: logs,
            error: null,
        }
    }
}




