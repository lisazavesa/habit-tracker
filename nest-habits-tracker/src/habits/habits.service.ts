import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Habit, Prisma } from '@prisma/client';


@Injectable()
export class HabitsService {
    constructor(private readonly prisma: PrismaService) {}

    getAll(userId: number): Promise<Habit[]> {
        return this.prisma.habit.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        })
    }

    create(title: string, userId: number, description?: string): Promise<Habit> {
        return this.prisma.habit.create({
            data: { 
                title, 
                description,
                user: {
                    connect: { id: userId },
                },
            },
        });
    }

    findById(id: number): Promise<Habit | null> {
        return this.prisma.habit.findUnique({
            where: { id },
        });
    }

    update(id: number, patch: Prisma.HabitUpdateInput): Promise<Habit> {
    return this.prisma.habit.update({
        where: { id },
        data: patch,
        });
    }

    async delete(id: number): Promise<boolean> {
        try {
            await this.prisma.habit.delete({ where: { id } });
            return true;
        } catch {
            return false;
        }
    }
}
