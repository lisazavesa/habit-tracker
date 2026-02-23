export type HabitStats = {
    habitId: number;
    from: string;
    to: string;
    totalDays: number;
    doneDays: number;
    missedDays: number;
    currentStreak: number;
    longestStreak: number;
};
