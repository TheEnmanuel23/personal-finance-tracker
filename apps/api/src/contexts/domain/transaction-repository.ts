import type { Transaction, TransactionType } from "@prisma/client";

export interface TransactionFilters {
  walletId?: string;
  createdAt?: Date;
  category?: string;
  type?: TransactionType;
}

export interface TransactionRepository {
  save: (transaction: Partial<Transaction>) => Promise<Transaction>;

  update: (id: string, wallet: Partial<Transaction>) => Promise<Transaction>;

  getById: (id: string) => Promise<Transaction | null>;

  getByWalletId: (walletId: string) => Promise<Transaction[]>;

  delete: (id: string) => Promise<boolean>;

  getAll: () => Promise<Transaction[]>;

  filter: (filters: TransactionFilters) => Promise<Transaction[]>;
}
