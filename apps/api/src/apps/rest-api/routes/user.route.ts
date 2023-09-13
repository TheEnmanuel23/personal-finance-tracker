import express from "express";
import { userController } from "../dependencies/user.dependency";

const userRouter = express.Router();

userRouter.post("/", userController.save.bind(userController));

export { userRouter };
