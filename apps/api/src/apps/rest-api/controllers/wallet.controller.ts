import type { WalletApp } from "contexts/application/wallet";
import type { Request, Response } from "express";

export class WalletController {
  constructor(private readonly walletApp: WalletApp) {}

  async save(req: Request, res: Response) {
    const wallet = await this.walletApp.save(req.body);
    res.json(wallet);
  }

  async update(req: Request, res: Response) {
    const wallet = await this.walletApp.update(req.params.id, req.body);
    res.json(wallet);
  }

  async getById(req: Request, res: Response) {
    const wallet = await this.walletApp.getById(req.params.id);
    res.json(wallet);
  }

  async getAll(req: Request, res: Response) {
    const wallets = await this.walletApp.getAll();
    res.json(wallets);
  }

  async getTransactionsByWalletId(req: Request, res: Response) {
    const walletWithTransactions =
      await this.walletApp.getTransactionsByWalletId(req.params.id);

    res.json(walletWithTransactions);
  }

  async getWalletsByOwner(req: Request, res: Response) {
    const wallets = await this.walletApp.getWalletsByOwner(req.params.id);
    res.json(wallets);
  }

  async delete(req: Request, res: Response) {
    const deleted = await this.walletApp.delete(req.params.id);
    res.json(deleted);
  }
}
