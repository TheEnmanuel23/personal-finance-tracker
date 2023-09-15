import type { Wallet } from "@prisma/client";
import type { WalletRepository } from "../../domain/wallet-respository";
import { db } from "../../../lib/db";

export class WalletPrismaRepository implements WalletRepository {
  async save(wallet: Wallet) {
    const newWallet = await db.wallet.create({
      data: wallet,
    });

    return newWallet;
  }

  async update(id: string, wallet: Wallet) {
    const updatedWallet = await db.wallet.update({
      where: { id },
      data: wallet,
    });

    return updatedWallet;
  }

  async getById(id: string) {
    return await db.wallet.findUnique({ where: { id } });
  }

  async getAll() {
    return await db.wallet.findMany();
  }

  async getTransactionsByWalletId(walletId: string) {
    const walletWithTransactions = await db.wallet.findFirst({
      where: { id: walletId },
      include: {
        transactions: {
          orderBy: { createdAt: "asc" },
          include: { category: true },
        },
      },
    });

    return walletWithTransactions;
  }

  async getWalletsByOwner(ownerId: string) {
    const wallets = await db.wallet.findMany({
      where: {
        ownerId,
      },
    });

    return wallets;
  }
}
