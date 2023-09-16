import type { Wallet } from "@prisma/client";
import type { WalletRepository } from "../domain/wallet-respository";

export class WalletApp {
  constructor(private readonly walletRepository: WalletRepository) {}

  async save(wallet: Partial<Wallet>) {
    return await this.walletRepository.save(wallet);
  }

  async update(id: string, wallet: Partial<Wallet>) {
    return await this.walletRepository.update(id, wallet);
  }

  async getById(id: string) {
    return await this.walletRepository.getById(id);
  }

  async getAll() {
    return await this.walletRepository.getAll();
  }

  async getTransactionsByWalletId(walletId: string) {
    return await this.walletRepository.getTransactionsByWalletId(walletId);
  }

  async getWalletsByOwner(ownerId: string) {
    return await this.walletRepository.getWalletsByOwner(ownerId);
  }

  async delete(id: string) {
    return await this.walletRepository.delete(id);
  }
}
