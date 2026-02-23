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
    status: HabitStatus,
  ): Promise<HabitLog> {
    return this.prisma.habitLog.upsert({
      where: { habitId_date: { habitId, date } },
      update: { status },
      create: { habitId, date, status },
    });
  }

  getByHabitId(
    habitId: number,
    from?: string | undefined,
    to?: string | undefined,
  ): Promise<HabitLog[]> {
    const where: any = { habitId };

    if (from || to) {
      where.date = {};
    }

    if (from) {
      where.date.gte = from;
    }

    if (to) {
      where.date.lte = to;
    }

    return this.prisma.habitLog.findMany({
      where,
      orderBy: { date: 'asc' },
    });
  }

  async delete(logId: number, habitId: number): Promise<void> {
    await this.prisma.habitLog.delete({
      where: { id: logId, habitId },
    });
  }
}
