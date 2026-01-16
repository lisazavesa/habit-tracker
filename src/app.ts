import express from "express";
import { habitsRouter } from "./routes/habits.routes";
import { errorHandler } from "./middlewares/errorHandler";
// import { asyncHandler } from "./utils/asyncHandler";

export const app = express();

app.use(express.json());

// routes
app.use("/habits", habitsRouter);

// healthcheck (удобно для проверки)
app.get("/health", (req, res) => {
    res.json({ ok: true });
});

// error handler last
app.use(errorHandler);
