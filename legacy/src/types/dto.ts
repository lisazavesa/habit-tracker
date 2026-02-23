import { HabitLogStatus } from './habitLog'

export type CreateHabitDto = {
    title: string;
    description?: string;
};

export type UpdateHabitDto = {
    title?: string;
    description?: string;
    isActive?: boolean;
};

export type LogHabitDto = {
  date: string;                // "YYYY-MM-DD"
  status: HabitLogStatus;      // "done" | "missed"
};
