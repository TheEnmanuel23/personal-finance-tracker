import express from "express";
import { categoryController } from "../dependencies/categories.dependency";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAll.bind(categoryController));
categoryRouter.get(
  "/:type",
  categoryController.getByType.bind(categoryController),
);

export { categoryRouter };
