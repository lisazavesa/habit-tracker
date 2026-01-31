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

    async getByHabitId(
        habitId: number,
        from?: string,
        to?: string
    ): Promise<HabitLog[]> {

        let result = logs.filter(l => l.habitId === habitId)
        
        if (from) {
            result = result.filter(l => l.date >= from)
        }

        if (to) {
            result = result.filter(l => l.date <= to)
        }

        return result
    }
};
