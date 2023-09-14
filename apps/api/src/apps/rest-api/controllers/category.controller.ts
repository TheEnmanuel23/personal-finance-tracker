import type { TransactionType } from "@prisma/client";
import type { CategoryApp } from "contexts/application/category";
import type { Request, Response } from "express";

export class CategoryController {
  constructor(private readonly categoryApp: CategoryApp) {}

  async getAll(req: Request, res: Response) {
    const categories = await this.categoryApp.getAll();
    res.json(categories);
  }

  async getByType(req: Request, res: Response) {
    const categories = await this.categoryApp.getByType(
      req.params.type.toUpperCase() as TransactionType,
    );
    res.json(categories);
  }
}
