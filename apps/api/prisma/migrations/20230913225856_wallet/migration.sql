/*
  Warnings:

  - Added the required column `note` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "note" TEXT NOT NULL;
