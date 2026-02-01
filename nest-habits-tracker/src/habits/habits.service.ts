import { Injectable } from '@nestjs/common';
import { Habit } from "../habits/types/habit.type";

@Injectable()
export class HabitsService {
    private habits: Habit[] = [];

    getAll(): Habit[] {
        return this.habits
    }

    create(title: string, description?: string): Habit {
        const newHabit: Habit = {
            id: Date.now(),
            title,
            description,
            isActive: true,
            createdAt: new Date().toISOString(),
        }

        this.habits.push(newHabit)
        return newHabit
    }

    findById(id: number): Habit | undefined {
        return this.habits.find(h => h.id ===  id)
    }

    update(
        id: number, 
        patch: { title?: string; description?: string; isActive?: boolean }
    ): Habit | undefined {
        const habit = this.habits.find(h => h.id ===  id)

        if (!habit) {
            return
        }

        if (patch.title !== undefined) {
            habit.title = patch.title
        }
        if (patch.description !== undefined) {
            habit.description = patch.description 
        }
        if (patch.isActive !== undefined) {
            habit.isActive = patch.isActive 
        }

        return habit;
    }

    delete(id: number): boolean  {
        const habit = this.habits.find(h => h.id ===  id)
        
        if (!habit) {
            return false
        }

        const index = this.habits.findIndex(h => h.id === habit.id)
        this.habits.splice(index, 1)
        return true
    }
}
