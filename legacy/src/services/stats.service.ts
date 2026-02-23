import { HabitStats } from "../types/stats";
import { logsService } from "./logs.service";
import { addDays } from "../utils/date";

export const statsService = {
        async getHabitStats(
            habitId: number,
            from: string,
            to: string
        ): Promise<HabitStats> {

            const logs = await logsService.getByHabitId(habitId, from, to)

            const statusByDate = new Map<string, "done" | "missed">();
            for (const log of logs) {
                statusByDate.set(log.date, log.status)
            }

            let totalDays = 0;
            let doneDays = 0;
            let missedDays = 0;

            let currentRun = 0;
            let longestStreak = 0;

            let day = from;
            while (day <= to) {
                totalDays++;

                const status = statusByDate.get(day) ?? "missed"

                if (status === "done") {
                    doneDays++;
                    currentRun++;

                    if (currentRun > longestStreak) longestStreak = currentRun
                } else {
                    missedDays++;
                    currentRun = 0;
                }

                day = addDays(day, 1)
            }

            let currentStreak = 0;
            let backDay = to;

            while (backDay >= from) {
                const status = statusByDate.get(backDay) ?? "missed";

                if (status === "done") {
                    currentStreak++;
                    backDay = addDays(backDay, -1);
                } else {
                    break
                }
                    
            }

            const habitStats: HabitStats = {
                habitId,
                from,
                to,
                totalDays,
                missedDays,
                doneDays,
                currentStreak,
                longestStreak,
            };

            return habitStats
        }

}