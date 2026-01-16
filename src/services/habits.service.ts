import { Habit } from "../types/habit";

export let habits: Habit[] = [];

export const habitsService = {
        async getAll(): Promise<Habit[]> { 
        return habits;
    },

    async create(title: string, description?: string): Promise<Habit> {
        const newHabit: Habit = {
            id: Date.now(),
            title,
            description,
            isActive: true,
            createdAt: new Date().toISOString(),
        };

        habits.push(newHabit);
        return newHabit;
    },

    async findById(id: number): Promise<Habit | undefined> {
        return habits.find(h => h.id === id);
    },

    async update(
        id: number, 
        title?: string, 
        description?: string,
        isActive?: boolean): Promise<Habit | undefined> {

        const habit = habits.find(h => h.id === id);

        if (!habit) {
            return
        }

        if (title !== undefined) {
            habit.title = title
        }
        if (description !== undefined) {
            habit.description = description 
        }
        if (isActive !== undefined) {
            habit.isActive = isActive 
        }

        return habit;
    },
};
