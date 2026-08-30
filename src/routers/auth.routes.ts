import { Router } from "express";
import { userRegistrationController, loginUserController } from "../controllers/auth.controller";

export const userRouter = Router();

userRouter.post('/register',userRegistrationController)
userRouter.post ('/login', loginUserController)
