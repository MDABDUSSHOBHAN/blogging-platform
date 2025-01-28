import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../../middleware/validateRequest";
import { userZodSchema } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";

const authRouter = Router();

authRouter.post('/register',validateRequest(userZodSchema),AuthController.register);

//this is for login
authRouter.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthController.login)

export const authRoute = authRouter;