import { HabitStatus } from '@prisma/client';

export class UpsertHabitLogDto {
    date: string;
    status: HabitStatus
}