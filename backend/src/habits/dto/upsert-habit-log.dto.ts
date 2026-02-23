import { HabitStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpsertHabitLogDto {
    @IsNotEmpty()
    @IsString()
    date: string;

    @IsEnum(HabitStatus)
    status: HabitStatus
}