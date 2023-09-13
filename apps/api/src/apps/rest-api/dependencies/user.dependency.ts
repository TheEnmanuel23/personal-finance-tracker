import { UserApp } from "../../../contexts/application/user";
import { UserPrismaRepository } from "../../../contexts/infrastructure/prisma/UserPrismaRepository";
import { UserController } from "../controllers/user.controller";

const userRepository = new UserPrismaRepository();
const userApp = new UserApp(userRepository);

export const userController = new UserController(userApp);
