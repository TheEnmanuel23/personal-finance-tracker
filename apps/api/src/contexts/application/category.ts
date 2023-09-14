import type { CategoryRepository } from "../domain/category-repository";

export class CategoryApp {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAll() {
    return await this.categoryRepository.getAll();
  }
}
