import { UserApp } from "../../../contexts/application/user";
import { UserPrismaRepository } from "../../../contexts/infrastructure/prisma/UserPrismaRepository";
import { UserController } from "../controllers/user.controller";

export const userRepository = new UserPrismaRepository();
export const userApp = new UserApp(userRepository);

export const userController = new UserController(userApp);
