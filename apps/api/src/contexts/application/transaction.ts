import type { Transaction } from "@prisma/client";
import type {
  TransactionFilters,
  TransactionRepository,
} from "../domain/transaction-repository";

export class TransactionApp {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async save(transaction: Transaction) {
    return await this.transactionRepository.save(transaction);
  }

  async update(id: string, transaction: Transaction) {
    return await this.transactionRepository.update(id, transaction);
  }

  async getById(id: string) {
    return await this.transactionRepository.getById(id);
  }

  async getByWalletId(walletId: string) {
    return await this.transactionRepository.getByWalletId(walletId);
  }

  async getAll() {
    return await this.transactionRepository.getAll();
  }

  async delete(id: string) {
    return await this.transactionRepository.delete(id);
  }

  async filter(filters: TransactionFilters) {
    return await this.transactionRepository.filter(filters);
  }

  async filterByDateRage(walletId: string, startDate: Date, endDate: Date) {
    return await this.transactionRepository.filterByDateRange(
      walletId,
      startDate,
      endDate,
    );
  }
}
