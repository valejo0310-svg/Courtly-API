import { Request, Response } from "express";
import { CreateReservationDTO } from "../dto/create-reservation.dto";
import {
    createReservation,
    getReservationsByUser,
    getAllReservations
} from "../services/reservation.service";

/**
 * Handles the creation of a reservation for the authenticated user.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
export async function createReservationController(
    req: Request,
    res: Response
): Promise<void> {

    if (!req.user) {
        res.status(401).json({
            message: "Authentication required"
        });
        return;
    }

    const data: CreateReservationDTO = req.body;

    const reservation = await createReservation(
        req.user.userId,
        data
    );

    res.status(201).json(reservation);
}

/**
 * Returns all reservations belonging to the authenticated user.
 */
export async function getMyReservationsController(
    req: Request,
    res: Response
): Promise<void> {

    if (!req.user) {
        res.status(401).json({
            message: "Authentication required"
        });
        return;
    }

    const reservations = await getReservationsByUser(
        req.user.userId
    );

    res.status(200).json(reservations);
}

/**
 * Returns all reservations in the system.
 * Intended for administrators.
 */
export async function getAllReservationsController(_req: Request, res: Response): Promise<void> {

    const reservations = await getAllReservations();

    res.status(200).json(reservations);
}