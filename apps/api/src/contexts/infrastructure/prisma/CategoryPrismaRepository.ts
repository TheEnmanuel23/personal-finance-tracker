import type { CategoryRepository } from "../../domain/category-repository";
import { db } from "../../../lib/db";
import type { TransactionType } from "@prisma/client";

export class CategoryPrismaRepository implements CategoryRepository {
  async getAll() {
    return await db.transactionCategory.findMany();
  }

  async getByType(type: TransactionType) {
    return await db.transactionCategory.findMany({
      where: { type },
    });
  }
}
