import type { TransactionApp } from "contexts/application/transaction";
import type { Request, Response } from "express";

export class TransactionController {
  constructor(private readonly transactionApp: TransactionApp) {}

  async save(req: Request, res: Response) {
    const transaction = await this.transactionApp.save(req.body);
    res.json(transaction);
  }

  async update(req: Request, res: Response) {
    const transaction = await this.transactionApp.update(
      req.params.id,
      req.body,
    );
    res.json(transaction);
  }

  async getById(req: Request, res: Response) {
    const transaction = await this.transactionApp.getById(req.params.id);
    res.json(transaction);
  }

  async getByWalletId(req: Request, res: Response) {
    const transactions = await this.transactionApp.getByWalletId(
      req.params.walletId,
    );
    res.json(transactions);
  }

  async delete(req: Request, res: Response) {
    const deleted = await this.transactionApp.delete(req.params.id);
    res.json(deleted);
  }

  async getAll(req: Request, res: Response) {
    const transactions = await this.transactionApp.getAll();
    res.json(transactions);
  }

  async filter(req: Request, res: Response) {
    const transactions = await this.transactionApp.filter(req.query);
    res.json(transactions);
  }

  async filterByDateRange(req: Request, res: Response) {
    const startYear = Number(req.query.startYear);
    const startMonth = Number(req.query.startMonth);
    const endYear = Number(req.query.endYear);
    const endMonth = Number(req.query.endMonth);

    const startDate = new Date(startYear, startMonth - 1, 1);
    const endDate = new Date(endYear, endMonth, 1);
    const transactions = await this.transactionApp.filterByDateRage(
      startDate,
      endDate,
    );
    res.json(transactions);
  }
}
