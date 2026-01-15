import { Router } from "express";
import { habitsService } from "../services/habits.service";
import { ApiResponse } from "../types/api";
import { Habit } from "../types/habit";


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

habitsRouter.post("/", (req, res) => {
    res.json({ message: "POST /habits (todo)" });
});

habitsRouter.get("/:id", (req, res) => {
    res.json({ message: "GET /habits/:id (todo)" });
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
