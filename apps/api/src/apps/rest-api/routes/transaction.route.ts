import express from "express";
import { transactionController } from "../dependencies/transaction.dependency";

const transactionRouter = express.Router();

transactionRouter.post(
  "/",
  transactionController.save.bind(transactionController),
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
  "/:walletId",
  transactionController.getByWalletId.bind(transactionController),
);

transactionRouter.get(
  "/filter",
  transactionController.filter.bind(transactionController),
);

export { transactionRouter };
