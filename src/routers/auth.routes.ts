import { Router } from "express";
import { userRegistrationController, loginUserController } from "../controllers/auth.controller";
import {validateRegister, validateLogin} from "../middlewares/validation.middleware";

export const userRouter = Router();

userRouter.post('/register',validateRegister,userRegistrationController)
userRouter.post ('/login',validateLogin, loginUserController)


