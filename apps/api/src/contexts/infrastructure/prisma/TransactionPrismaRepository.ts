import type { Transaction } from "@prisma/client";
import type {
  TransactionFilters,
  TransactionRepository,
} from "../../domain/transaction-repository";
import { db } from "../../../lib/db";

export class TransactionPrismaRepository implements TransactionRepository {
  async save(transaction: Transaction) {
    const newTransaction = await db.transaction.create({
      data: transaction,
    });

    return newTransaction;
  }

  async update(id: string, transaction: Transaction) {
    const updatedTransacton = await db.transaction.update({
      where: { id },
      data: transaction,
    });

    return updatedTransacton;
  }

  async getById(id: string) {
    return await db.transaction.findUnique({ where: { id } });
  }

  async getByWalletId(walletId: string) {
    return await db.transaction.findMany({ where: { walletId } });
  }

  async getAll() {
    return await db.transaction.findMany();
  }

  async delete(id: string) {
    try {
      await db.transaction.delete({ where: { id } });
      return true;
    } catch (err) {
      return false;
    }
  }

  async filter(filters: TransactionFilters) {
    const composedFilters = {
      ...(filters.walletId && { walletId: filters.walletId }),
      ...(filters.createdAt && { createdAt: filters.createdAt }),
      ...(filters.category && { categoryId: filters.category }),
      ...(filters.type && { type: filters.type }),
    };

    return await db.transaction.findMany({
      where: composedFilters,
    });
  }
}
