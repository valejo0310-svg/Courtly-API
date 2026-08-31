import { CreateReservationDTO } from "../dto/create-reservation.dto";
import { Reservation } from "../models/reservation.model";

import { findById } from "../repositories/court.repository";

import {
    findScheduleConflict,
    createReservationRecord,
    findReservationsByUser,
    findAllReservations
} from "../repositories/reservation.repository";

import { AppError } from "../errors/app-error";

/**
 * Creates a new reservation for an authenticated user.
 *
 * VALIDATE -> CONSULT -> DECIDE -> CALCULATE -> SAVE -> RETURN
 *
 * Validates the schedule, verifies the court,
 * checks availability, calculates the total price
 * and persists the reservation.
 */
export async function createReservation(
    userId: number,
    data: CreateReservationDTO
): Promise<Reservation> {

    // VALIDATE
    if (data.endHour <= data.startHour) {
        throw new AppError(
            "Invalid reservation schedule",
            400
        );
    }

    // CONSULT
    const court = await findById(data.courtId);

    // DECIDE
    if (!court) {
        throw new AppError(
            "Court not found",
            404
        );
    }

    if (!court.active) {
        throw new AppError(
            "Court is not available",
            409
        );
    }

    // CONSULT
    const conflict = await findScheduleConflict(
        data.courtId,
        data.startHour,
        data.endHour
    );

    // DECIDE
    if (conflict) {
        throw new AppError(
            "Schedule is already reserved",
            409
        );
    }

    // CALCULATE
    const duration =
        data.endHour - data.startHour;

    const totalPrice =
        duration * court.pricePerHour;

    // SAVE
    const reservation =
        await createReservationRecord({
            userId,
            courtId: data.courtId,
            startHour: data.startHour,
            endHour: data.endHour,
            totalPrice
        });

    // RETURN
    return reservation;
}

/**
 * Retrieves all reservations belonging to a user.
 */
export async function getReservationsByUser(
    userId: number
): Promise<Reservation[]> {

    return await findReservationsByUser(userId);
}

/**
 * Retrieves every reservation in the system.
 */
export async function getAllReservations():
Promise<Reservation[]> {

    return await findAllReservations();
}