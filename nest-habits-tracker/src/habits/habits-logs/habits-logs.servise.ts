import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HabitStatus } from '@prisma/client';
import { HabitLog } from '@prisma/client';

@Injectable()
export class HabitLogsService {
    constructor(private readonly prisma: PrismaService) {}

    upsert(
        habitId: number, 
        date: string, 
        status: HabitStatus
    ): Promise<HabitLog> {
            return this.prisma.habitLog.upsert({
                where: { habitId_date: { habitId, date } },
                update: { status },
                create: { habitId, date, status }
            })
        }
}