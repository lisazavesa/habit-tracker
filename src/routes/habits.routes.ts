import { Router } from "express";

export const habitsRouter = Router();


habitsRouter.get("/", (req, res) => {
    res.json({ message: "GET /habits (todo)" });
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
