import { Router } from "express";
import { habitsService } from "../services/habits.service";
import { logsService } from "../services/logs.service";
import { ApiResponse } from "../types/api";
import { Habit } from "../types/habit";
import { HabitLog } from "../types/habitLog";
import { validateId } from "../middlewares/validateId";
import { asyncHandler } from "../utils/asyncHandler";

// import { habits } from "../services/habits.service";


export const habitsRouter = Router();


habitsRouter.get(
    "/", 
    asyncHandler(async (req, res) => {
        const habits = await habitsService.getAll()

        const response: ApiResponse<Habit[]> = {
            success: true,
            data: habits,
            error: null,
        }

        res.json(response)
    })
);

habitsRouter.post(
    "/", 
    asyncHandler(async (req, res) => {
        const { title, description } = req.body as { 
            title?: unknown; 
            description?: unknown 
        };


    if (!title || typeof title !== 'string') {
        return res.status(400).json({
            success: false,
            data: null,
            error: "ошибка в заголовке",
        });
    }

    const desc = 
        typeof description === "string" ? description : undefined

    const newHabit = await habitsService.create(title, desc)

    const response: ApiResponse<Habit> = {
            success: true,
            data: newHabit,
            error: null,
        }

    res.status(201).json(response)
    })
)

habitsRouter.get(
    "/:id", 
    validateId, 
    asyncHandler(async (req, res) => {
        const id = Number(req.params.id)

        const habit = await habitsService.findById(id)

        if (!habit) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "привычка не найдена",
            });
        } else {
            const response: ApiResponse<Habit> = {
                success: true,
                data: habit,
                error: null,
            }

            res.json(response)
        }
    })
);

habitsRouter.patch(
    "/:id", 
    validateId, 
    asyncHandler(async (req, res) => {
        const id = Number(req.params.id)
        const { title, description, isActive } = req.body as {
            title?: unknown;
            description?: unknown;
            isActive?: unknown;
        };

        if (title !== undefined && typeof title !== 'string') {
            return res.status(400).json({
                success: false,
                data: null,
                error: "ошибка в заголовке",
            });
        }

        if (description !== undefined && typeof description !== 'string') {
            return res.status(400).json({
                success: false,
                data: null,
                error: "ошибка в описании",
            });
        }

        if (isActive !== undefined && typeof isActive !== 'boolean') {
            return res.status(400).json({
                success: false,
                data: null,
                error: "ошибка статуса привычки",
            });
        }

        if (title === undefined && description === undefined && isActive === undefined) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "нет данных для обновления",
            });
        }

        const updateHabit = await habitsService.update(
            id,
            title as string | undefined,
            description as string | undefined,
            isActive as boolean | undefined
        )

        if (!updateHabit) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "привычка не найдена",
            });
        }

        const response: ApiResponse<Habit> = {
                success: true,
                data: updateHabit,
                error: null,
            }

        res.json(response)
    })
)

habitsRouter.delete(
    "/:id", 
    validateId, 
    asyncHandler(async (req, res) => {
        const id = Number(req.params.id)

        const deleted = await habitsService.delete(id)

        if (!deleted) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "привычка не найдена",
            });
        }

        return res.status(204).send()
    })
)

// Logs
habitsRouter.post(
    "/:id/logs", 
    validateId, 
    asyncHandler(async (req, res) => {

        const habitId = Number(req.params.id)

        const habit = await habitsService.findById(habitId)
        if (!habit) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "привычка не найдена",
            });
        };

        const { date, status } = req.body as { 
            date?: unknown,
            status?: unknown 
        };

        if (
            (typeof date !== 'string') ||
            (typeof status !== 'string')
        ) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "ошибка",
            });
        }

        if (status !== 'done' && status !== "missed") {
            return res.status(400).json({
                success: false,
                data: null,
                error: "ошибка в статусе",
            });
        }

        const habitLog = await logsService.upsert(habitId, date, status)

        const response: ApiResponse<HabitLog> = {
            success: true,
            data: habitLog,
            error: null,
        }

        res.status(200).json(response)
    })
)

habitsRouter.get("/:id/logs", 
    validateId, 
    asyncHandler(async (req, res) => {

    })
)

// Stats
// habitsRouter.get("/:id/stats", 
//     validateId, 
//     asyncHandler(async (req, res) => {

//     })
// )
