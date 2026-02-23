import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HabitLog } from "@/types";
import { habitsApi } from "@/api/habits";

interface StatsState {
  logsToday: { [habitId: string]: HabitLog | null };
  completedToday: string[];
  weekStreak: { [habitId: string]: number };
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  logsToday: {},
  completedToday: [],
  weekStreak: {},
  loading: false,
  error: null,
};

export const fetchTodayLogs = createAsyncThunk(
  "stats/fetchTodayLogs",
  async (habitId: string, { rejectWithValue }) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const response = await habitsApi.getLogsByDateRange(
        habitId,
        today,
        today,
      );
      return { habitId, log: response.data[0] || null };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch today logs",
      );
    }
  },
);

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodayLogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodayLogs.fulfilled, (state, action) => {
      state.loading = false;
      const { habitId, log } = action.payload;
      state.logsToday[habitId] = log;
      if (log) {
        if (!state.completedToday.includes(habitId)) {
          state.completedToday.push(habitId);
        }
      }
    });
    builder.addCase(fetchTodayLogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = statsSlice.actions;
export default statsSlice.reducer;
