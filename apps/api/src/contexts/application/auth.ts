import {
  comparePasswords,
  createJWT,
  validateJWT,
  hashPassword,
} from "../../lib/auth";
import type { UserApp } from "./user";

export class AuthApp {
  constructor(private readonly userApp: UserApp) {}

  async login(email: string, password: string) {
    const user = await this.userApp.getByEmail(email);

    if (!user) return null;

    const isUser = await comparePasswords(password, user.password);

    if (!isUser) {
      return null;
    }

    const jwt = await createJWT(user);
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      jwt,
    };
  }

  async register(user: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) {
    const newUser = { ...user };
    newUser.password = await hashPassword(user.password);
    const savedUser = await this.userApp.save(newUser);

    const jwt = await createJWT({
      id: savedUser?.id ?? "",
      email: savedUser?.email ?? "",
    });

    return {
      user: {
        id: savedUser?.id,
        email: savedUser?.email,
        firstName: savedUser?.firstName,
        lastName: savedUser?.lastName,
      },
      jwt,
    };
  }

  async validateUser(token: string) {
    const data = await validateJWT(token);

    if (!data) return null;

    const { id } = data;
    const user = await this.userApp.getById(id);
    return user;
  }
}
