import type { TransactionCategory } from "@prisma/client";

export interface CategoryRepository {
  getAll: () => Promise<TransactionCategory[]>;
}
