import { CategoryApp } from "../../../contexts/application/category";
import { CategoryPrismaRepository } from "../../../contexts/infrastructure/prisma/CategoryPrismaRepository";
import { CategoryController } from "../controllers/category.controller";

const categoryRepository = new CategoryPrismaRepository();

const categoryApp = new CategoryApp(categoryRepository);

export const categoryController = new CategoryController(categoryApp);
