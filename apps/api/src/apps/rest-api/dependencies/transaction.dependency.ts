import { TransactionApp } from "../../../contexts/application/transaction";
import { TransactionPrismaRepository } from "../../../contexts/infrastructure/prisma/TransactionPrismaRepository";
import { TransactionController } from "../controllers/transaction.controller";

const transactionRepository = new TransactionPrismaRepository();

const transactionApp = new TransactionApp(transactionRepository);

export const transactionController = new TransactionController(transactionApp);
