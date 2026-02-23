export type HabitLogStatus = "done" | "missed";

export type HabitLog = {
    id: number;
    habitId: number;
    date: string;       // "2026-01-15"
    status: HabitLogStatus;
    createdAt: string;  // ISO
};
