import express from "express";
import { walletController } from "../dependencies/wallet.dependency";

const walletRouter = express.Router();

walletRouter.post("/", walletController.save.bind(walletController));
walletRouter.put("/:id", walletController.update.bind(walletController));
walletRouter.get("/", walletController.getAll.bind(walletController));
walletRouter.get("/:id", walletController.getById.bind(walletController));
walletRouter.get(
  "/owner/:id",
  walletController.getWalletsByOwner.bind(walletController),
);
walletRouter.get(
  "/:id/transactions",
  walletController.getTransactionsByWalletId.bind(walletController),
);
walletRouter.delete("/:id", walletController.delete.bind(walletController));

export { walletRouter };
