import express from "express";
import { transactionController } from "../dependencies/transaction.dependency";
import { categoryRouter } from "./category.route";

const transactionRouter = express.Router();

transactionRouter.post(
  "/",
  transactionController.save.bind(transactionController),
);

transactionRouter.get(
  "/by-range-date",
  transactionController.filterByDateRange.bind(transactionController),
);

transactionRouter.use("/categories", categoryRouter);

transactionRouter.get(
  "/filter",
  transactionController.filter.bind(transactionController),
);

transactionRouter.get(
  "/",
  transactionController.getAll.bind(transactionController),
);

transactionRouter.get(
  "/:id",
  transactionController.getById.bind(transactionController),
);

transactionRouter.put(
  "/:id",
  transactionController.update.bind(transactionController),
);

transactionRouter.delete(
  "/:id",
  transactionController.delete.bind(transactionController),
);

transactionRouter.get(
  "/wallet/:id",
  transactionController.getByWalletId.bind(transactionController),
);

export { transactionRouter };
