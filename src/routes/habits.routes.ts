import { Router } from "express";
import { habitsService } from "../services/habits.service";
import { ApiResponse } from "../types/api";
import { Habit } from "../types/habit";
import { validateId } from "../middlewares/validateId";


import { habits } from "../services/habits.service";


export const habitsRouter = Router();


habitsRouter.get("/", async (req, res, next) => {
    try {
        const habits = await habitsService.getAll()

        const response: ApiResponse<Habit[]> = {
            success: true,
            data: habits,
            error: null,
        }

        res.json(response)
        
    } catch (err) {
        next()
    }
});

habitsRouter.post("/", async (req, res, next) => {
    try {
        const { title, description } = req.body

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
    } catch (err) {
        next(err)
    }
    
});

habitsRouter.get("/:id", validateId, async (req, res, next) => {
    try {
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
    } catch (err) {
        next(err)
    }
});

habitsRouter.patch("/:id", validateId, async (req, res, next) => {
    try {
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

    } catch (err) {
        next(err)
    }
});





habitsRouter.delete("/:id", (req, res) => {
    res.status(204).send();
});

// Logs
habitsRouter.post("/:id/logs", (req, res) => {
    res.json({ message: "POST /habits/:id/logs (todo)" });
});

habitsRouter.get("/:id/logs", (req, res) => {
    res.json({ message: "GET /habits/:id/logs (todo)" });
});

// Stats
habitsRouter.get("/:id/stats", (req, res) => {
    res.json({ message: "GET /habits/:id/stats (todo)" });
});
