import { Request, Response, NextFunction } from "express";

export function validateId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            success: false,
            data: null,
            error: "id должно быть цифрой!",
        });
    }

    next();
}