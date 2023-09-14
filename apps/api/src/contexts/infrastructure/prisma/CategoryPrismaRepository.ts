import type { CategoryRepository } from "../../domain/category-repository";
import { db } from "../../../lib/db";

export class CategoryPrismaRepository implements CategoryRepository {
  async getAll() {
    return await db.transactionCategory.findMany();
  }
}
