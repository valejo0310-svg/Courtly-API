import { Router } from "express";
import { createCourtController,
        getAllCourtsController,
        getCourtByIdController,
        updateCourtController,
        deleteCourtController
} from "../controllers/court.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";


export const courtRouter = Router();


courtRouter.post("/", authMiddleware,  roleMiddleware('ADMIN','CUSTOMER'),createCourtController);
courtRouter.get('/',authMiddleware, roleMiddleware('ADMIN','CUSTOMER'),getAllCourtsController)
courtRouter.get('/:id',authMiddleware, roleMiddleware('ADMIN','CUSTOMER'),getCourtByIdController)
courtRouter.patch('/:id', authMiddleware,roleMiddleware('ADMIN'),updateCourtController)
courtRouter.delete('/:id',authMiddleware, roleMiddleware('ADMIN'),deleteCourtController)

