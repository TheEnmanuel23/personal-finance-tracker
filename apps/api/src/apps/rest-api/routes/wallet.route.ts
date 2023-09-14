import express from "express";
import { walletController } from "../dependencies/wallet.dependency";

const walletRouter = express.Router();

walletRouter.post("/", walletController.save.bind(walletController));
walletRouter.put("/:id", walletController.update.bind(walletController));
walletRouter.get("/", walletController.getAll.bind(walletController));
walletRouter.get("/:id", walletController.getById.bind(walletController));

export { walletRouter };
