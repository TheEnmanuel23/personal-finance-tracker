import type { User } from "@prisma/client";
import type { UserRepository } from "../domain/user-repository";
import { hashPassword } from "../../lib/auth";

export class UserApp {
  constructor(private readonly userRepository: UserRepository) {}

  async save(user: Partial<User>) {
    const newUser = { ...user };

    newUser.password = await hashPassword(user.password ?? "");

    return await this.userRepository.save(newUser);
  }

  async getByEmail(email: string) {
    return await this.userRepository.getByEmail(email);
  }

  async getById(id: string) {
    return await this.userRepository.getById(id);
  }
}
