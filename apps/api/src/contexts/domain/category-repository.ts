import type { TransactionCategory, TransactionType } from "@prisma/client";

export interface CategoryRepository {
  getAll: () => Promise<TransactionCategory[]>;
  getByType: (type: TransactionType) => Promise<TransactionCategory[]>;
}
