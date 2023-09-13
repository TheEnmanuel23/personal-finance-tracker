import type { User } from "@prisma/client";
import type { UserRepository } from "../domain/user-repository";

export class UserApp {
  constructor(private readonly userRepository: UserRepository) {}

  async save(user: Partial<User>) {
    return await this.userRepository.save(user);
  }

  async getByEmail(email: string) {
    return await this.userRepository.getByEmail(email);
  }

  async getById(id: string) {
    return await this.userRepository.getById(id);
  }
}
