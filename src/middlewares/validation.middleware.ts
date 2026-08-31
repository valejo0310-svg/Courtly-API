import {Request,Response,NextFunction} from "express";

/**
 * Validates the register request body.
 */
export function validateRegister(req: Request,res: Response,next: NextFunction): void {

    const {name,email,password} = req.body;

    if (!name || !email || !password) {

        res.status(400).json({
            message:
                "Name, email and password are required"
        });

        return;
    }

    next();
}

/**
 * Validates the login request body.
 */
export function validateLogin(req: Request, res: Response, next: NextFunction): void {

    const { email, password} = req.body;

    if (!email || !password) {

        res.status(400).json({
            message:
                "Email and password are required"
        });

        return;
    }

    next();
}

/**
 * Validates the reservation request body.
 */
export function validateReservation(req: Request, res: Response, next: NextFunction): void {

    const {courtId, startHour, endHour} = req.body;

    if (courtId === undefined ||startHour === undefined || endHour === undefined) {

        res.status(400).json({
            message:
                "courtId, startHour and endHour are required"
        });

        return;
    }

    if (typeof courtId !== "number" || typeof startHour !== "number" || typeof endHour !== "number" ) {

        res.status(400).json({
            message:
                "courtId, startHour and endHour must be numbers"
        });

        return;
    }

    next();
}

/**
 * Validates the creation of a court.
 */
export function validateCreateCourt( req: Request, res: Response, next: NextFunction): void {

    const {name,pricePerHour} = req.body;

    if (!name || pricePerHour === undefined) {

        res.status(400).json({
            message:
                "Name and pricePerHour are required"
        });

        return;
    }

    next();
}