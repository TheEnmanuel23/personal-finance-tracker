import express from "express";
import { authController } from "../dependencies/auth.dependency";

const authRouter = express.Router();

authRouter.post("/signin", authController.signIn.bind(authController));
authRouter.post("/signup", authController.signUp.bind(authController));

export { authRouter };
