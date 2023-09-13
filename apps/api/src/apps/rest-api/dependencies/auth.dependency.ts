import { AuthApp } from "../../../contexts/application/auth";
import { AuthController } from "../controllers/auth.controller";
import { userApp } from "./user.dependency";

const authApp = new AuthApp(userApp);

export const authController = new AuthController(authApp);
