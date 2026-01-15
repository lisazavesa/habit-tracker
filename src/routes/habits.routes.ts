import { Router } from "express";
import { habitsService } from "../services/habits.service";
import { ApiResponse } from "../types/api";
import { Habit } from "../types/habit";
import { validateId } from "../middlewares/validateId";


// import { habits } from "../services/habits.service";


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

habitsRouter.patch("/:id", (req, res) => {
    res.json({ message: "PATCH /habits/:id (todo)" });
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
