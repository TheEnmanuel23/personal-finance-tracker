import type { User } from "@prisma/client";

export interface UserRepository {
  save: (user: User) => Promise<User | null>

  getByEmail: (email: string) => Promise<User | null>

  getById: (id: string) => Promise<User | null>
}
