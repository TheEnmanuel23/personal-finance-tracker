import type { Wallet } from "@prisma/client";

export interface WalletRepository {
  save: (wallet: Partial<Wallet>) => Promise<Wallet>;

  update: (id: string, wallet: Partial<Wallet>) => Promise<Wallet>;

  getById: (id: string) => Promise<Wallet | null>;

  getAll: () => Promise<Wallet[]>;

  getTransactionsByWalletId: (walletId: string) => Promise<Wallet | null>;
}
