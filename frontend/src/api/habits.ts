import api from "./instance";
import { Habit, HabitLog } from "@/types";

export interface CreateHabitRequest {
  title: string;
  description?: string;
}

export interface UpdateHabitRequest extends Partial<CreateHabitRequest> {}

export interface UpsertHabitLogRequest {
  date: string;
  status: "done" | "missed";
}

export const habitsApi = {
  // Привычки
  getAll: () => api.get<Habit[]>("/habits"),

  getById: (id: number) => api.get<Habit>(`/habits/${id}`),

  create: (data: CreateHabitRequest) => api.post<Habit>("/habits", data),

  update: (id: number, data: UpdateHabitRequest) =>
    api.patch<Habit>(`/habits/${id}`, data),

  delete: (id: number) => api.delete(`/habits/${id}`),

  // Логи привычек
  getLogs: (habitId: number) => api.get<HabitLog[]>(`/habits/${habitId}/logs`),

  getLogsByDateRange: (habitId: number, startDate: string, endDate: string) =>
    api.get<HabitLog[]>(`/habits/${habitId}/logs`, {
      params: { startDate, endDate },
    }),

  upsertLog: (habitId: number, data: UpsertHabitLogRequest) =>
    api.post<HabitLog>(`/habits/${habitId}/logs`, data),

  deleteLog: (habitId: number, logId: number) =>
    api.delete<void>(`/habits/${habitId}/logs/${logId}`),
};
