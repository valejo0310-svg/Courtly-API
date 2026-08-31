import {Request,Response, NextFunction} from "express";

import { AppError } from "../errors/app-error";

/**
 * Handles application errors and returns
 * consistent HTTP responses.
 */
export function errorMiddleware(error: Error,_req: Request, res: Response,next: NextFunction): void {

    if (error instanceof AppError) {

        res.status(error.statusCode).json({
            message: error.message
        });

        return;
    }

    console.error(error);

    res.status(500).json({
        message: "Internal server error"
    });
}