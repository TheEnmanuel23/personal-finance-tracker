import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}

function getPrismaClient(): PrismaClient {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  }

  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }

  return global.cachedPrisma;
}

const prisma = getPrismaClient();

export const db = prisma;
