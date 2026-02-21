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

    findById(id: number, userId: number): Promise<Habit | null> {
        return this.prisma.habit.findUnique({
            where: { 
                id,
                userId,
            },
        });
    }

    async update(
        id: number, 
        userId: number, 
        patch: Prisma.HabitUpdateInput
    ): Promise<Habit | null> {
        const habit = await this.prisma.habit.findFirst({
            where: { 
                id,
                userId,
            }
        })

        if (!habit) {
            return null;
        }

    return this.prisma.habit.update({
        where: { id },
        data: patch,
        });
    }

    async delete(id: number, userId: number): Promise<boolean> {
        const habit = await this.prisma.habit.findFirst({
            where: { 
                id,
                userId,
            }
        })

        if (!habit) {
            return false;
        }

        await this.prisma.habit.delete({ where: { id } });
        return true;
        
    }
}
