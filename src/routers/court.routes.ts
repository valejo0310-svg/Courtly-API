import { Router } from "express";
import { createCourtController,
        getAllCourtsController,
        getCourtByIdController,
        updateCourtController,
        deleteCourtController
} from "../controllers/court.controller";


export const courtRouter = Router();

courtRouter.post('/',createCourtController)
courtRouter.get('/',getAllCourtsController)
courtRouter.get('/:id',getCourtByIdController)
courtRouter.patch('/:id', updateCourtController)
courtRouter.delete('/:id', deleteCourtController)
