import { HabitLog, HabitLogStatus } from "../types/habitLog";


let logs: HabitLog[] = [];

export const logsService = {
    async upsert(
        habitId: number,
        date: string,
        status: HabitLogStatus
    ): Promise<HabitLog> {

        const existingLog = logs.find(
            l => l.habitId === habitId && l.date === date
        )

        if (existingLog) {
            existingLog.status = status;
            return existingLog;
        }

        const newLog: HabitLog = {
            id: Date.now(),
            habitId,
            date,
            status,
            createdAt: new Date().toISOString(),
        };

        logs.push(newLog);
        return newLog;
    },

    async getByHabitId(habitId: number): Promise<HabitLog[]> {
        return logs.filter(l => l.habitId === habitId)
    }
};
