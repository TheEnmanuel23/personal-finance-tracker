import type { TransactionType } from "@prisma/client";
import type { CategoryRepository } from "../domain/category-repository";

export class CategoryApp {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAll() {
    return await this.categoryRepository.getAll();
  }

  async getByType(type: TransactionType) {
    return await this.categoryRepository.getByType(type);
  }
}
