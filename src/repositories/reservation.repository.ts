import { Op } from "sequelize";
import { Reservation } from "../models/reservation.model";

interface ReservationData {
    userId: number;
    courtId: number;
    startHour: number;
    endHour: number;
    totalPrice: number;
}

export async function findScheduleConflict (courtId: number, startHour:number, endHour:number): Promise <Reservation | null>{
    const conflict = await Reservation.findOne({
        where: {courtId,startHour: {
                    [Op.lt]: endHour
                },
                endHour: {
                    [Op.gt]: startHour
                }
        }
    });
    return conflict;
}

export async function createReservationRecord(data: ReservationData): Promise<Reservation> {

    const reservation = await Reservation.create({
        userId: data.userId,
        courtId: data.courtId,
        startHour: data.startHour,
        endHour: data.endHour,
        totalPrice: data.totalPrice
    });

    return reservation;
}

/**
 * Retrieves the reservations created by a specific user.
 */
export async function findReservationsByUser(
    userId: number
): Promise<Reservation[]> {

    return await Reservation.findAll({
        where: {
            userId
        }
    });
}

/**
 * Retrieves all reservations.
 */
export async function findAllReservations(): Promise<Reservation[]> {

    return await Reservation.findAll();
}