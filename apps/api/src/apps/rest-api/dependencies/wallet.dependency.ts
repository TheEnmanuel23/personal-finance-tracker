import { WalletApp } from "../../../contexts/application/wallet";
import { WalletPrismaRepository } from "../../../contexts/infrastructure/prisma/WalletPrismaRepository";
import { WalletController } from "../controllers/wallet.controller";

export const walletRepository = new WalletPrismaRepository();
export const walletApp = new WalletApp(walletRepository);

export const walletController = new WalletController(walletApp);
