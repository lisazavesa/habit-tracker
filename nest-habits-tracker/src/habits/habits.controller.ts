import { Controller, Get, Post, Body } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { Habit } from "./types/habit.type";
import { CreateHabitDto } from "./dto/create-habit.dto";

type ApiResponse<T> = {
        success: boolean,
        data: T | null,
        error: string | null
    }

@Controller('habits')
export class HabitsController {
    constructor(private readonly habitsService: HabitsService) {}

    @Get()
    findAll(): ApiResponse<Habit[]> {
        const habits = this.habitsService.getAll()

        return {
            success: true,
            data: habits,
            error: null,
        }
    }

    @Post()
    createHabit(@Body() dto: CreateHabitDto): ApiResponse<Habit>  {
        if (!dto.title || typeof dto.title !== 'string') {
            return {
                success: false,
                data: null,
                error: 'title is required',
            }
        }

        const habit = this.habitsService.create(dto.title, dto.description)

        return {
            success: true,
            data: habit,
            error: null,
        }
    }
}


