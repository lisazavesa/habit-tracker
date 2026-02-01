import { Controller, Get, Post } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { Habit } from "./types/habit.type";

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
}


