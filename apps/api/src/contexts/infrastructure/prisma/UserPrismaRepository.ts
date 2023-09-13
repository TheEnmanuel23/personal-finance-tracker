import type { User } from "@prisma/client";
import type { UserRepository } from "../../domain/user-repository";
import { db } from "../../../lib/db";

export class UserPrismaRepository implements UserRepository {
  async save(user: User) {
    const newUser = await db.user.create({
      data: user
    });

    return newUser;
  }

  async getByEmail(email: string) {
    return await db.user.findUnique({ where: { email } });
  }

  async getById(id: string) {
    return await db.user.findUnique({ where: { id } });
  }
}
