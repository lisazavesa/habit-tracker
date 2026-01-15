import { Habit } from "../types/habit";

let habits: Habit[] = [];

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
};
