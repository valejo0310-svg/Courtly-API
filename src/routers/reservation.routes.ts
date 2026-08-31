import { Router } from "express";

import {
    createReservationController,
    getMyReservationsController,
    getAllReservationsController
} from "../controllers/reservation.controller";

import {authMiddleware} from "../middlewares/auth.middleware";

import { roleMiddleware} from "../middlewares/role.middleware";

import {validateReservation} from "../middlewares/validation.middleware";

export const reservationRouter = Router();

/**
 * @openapi
 * /api/reservations:
 *   post:
 *     summary: Create a reservation
 *     tags:
 *       - Reservations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReservation'
 *     responses:
 *       201:
 *         description: Reservation created
 *       409:
 *         description: Schedule conflict
 */
reservationRouter.post("/",authMiddleware,roleMiddleware( "CUSTOMER","ADMIN" ), validateReservation, createReservationController);

/**
 * @openapi
 * /api/reservations/me:
 *   get:
 *     summary: Get authenticated user's reservations
 *     tags:
 *       - Reservations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User reservations
 */
reservationRouter.get("/me", authMiddleware, roleMiddleware( "CUSTOMER", "ADMIN" ), getMyReservationsController);

/**
 * @openapi
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     tags:
 *       - Reservations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All reservations
 */
reservationRouter.get("/", authMiddleware, roleMiddleware("ADMIN"), getAllReservationsController);