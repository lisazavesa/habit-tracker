import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitLogsService } from './habits-logs/habits-logs.servise';
import { Habit, HabitLog } from '@prisma/client';
import { CreateHabitDto } from "./dto/create-habit.dto";
import { UpdateHabitDto } from "./dto/update-habit.dto";
import { UpsertHabitLogDto } from "./dto/upsert-habit-log.dto";

type ApiResponse<T> = {
        success: boolean,
        data: T | null,
        error: string | null
    }

@Controller('habits')
export class HabitsController {
    constructor(
        private readonly habitsService: HabitsService,
        private readonly logsService: HabitLogsService,
    ) {}

    @Get()
    async findAllHabits(): Promise<ApiResponse<Habit[]>> {
        const habits = await this.habitsService.getAll()

        return {
            success: true,
            data: habits,
            error: null,
        }
    }

    @Post()
    async createHabit(@Body() dto: CreateHabitDto): Promise<ApiResponse<Habit>>  {
        if (!dto.title || typeof dto.title !== 'string') {
            return {
                success: false,
                data: null,
                error: 'title is required',
            }
        }

        const habit = await this.habitsService.create(dto.title, dto.description)

        return {
            success: true,
            data: habit,
            error: null,
        }
    }

    @Get(':id')
    async findHabitById(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Habit>> {
        const habit = await this.habitsService.findById(id)

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
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateHabitDto,
    ): Promise<ApiResponse<Habit>> {
        if (dto.title !== undefined && typeof dto.title !== 'string') {
            return {
                success: false,
                data: null,
                error: 'title error',
            };
        }

        if (dto.description !== undefined && typeof dto.description !== 'string') {
            return {
                success: false,
                data: null,
                error: 'description error',
            };
        }

        if (dto.isActive !== undefined && typeof dto.isActive !== 'boolean') {
            return {
                success: false,
                data: null,
                error: "isActive error",
            };
        }

        if (dto.title === undefined && dto.description === undefined && dto.isActive === undefined) {
            return {
                success: false,
                data: null,
                error: "no data to update",
            };
        }

        const updateHabit = await this.habitsService.update(id, dto)

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
    async deleteHabit(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<null>> {
        const deleted = await this.habitsService.delete(id)

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
        @Param('id', ParseIntPipe) habitId: number,
        @Body() dto: UpsertHabitLogDto,
    ): Promise<ApiResponse<HabitLog>> {
        const habit = await this.habitsService.findById(habitId)

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
}




