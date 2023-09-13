import { comparePasswords, hashPassword } from "../../../src/lib/auth";
import { UserApp } from "../../../src/contexts/application/user";
import type { UserRepository } from "../../../src/contexts/domain/user-repository";

const mockUser = {
  id: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
  email: "user@gmail.com",
  firstName: "user",
  lastName: "person",
  password: "1234",
};

class UserRepoMock implements UserRepository {
  save = (newUser) => Promise.resolve(newUser);
  getByEmail = () => Promise.resolve(mockUser);
  getById = () => Promise.resolve(mockUser);
}

const userApp = new UserApp(new UserRepoMock());

describe("User tests", () => {
  test("should save user", async () => {
    const savedUser = await userApp.save(mockUser);
    expect(savedUser?.id).toBe(mockUser.id);
    expect(savedUser?.firstName).toBe(mockUser.firstName);
    expect(savedUser?.lastName).toBe(mockUser.lastName);
    expect(savedUser?.email).toBe(mockUser.email);
  });

  test("should validate a valid password", async () => {
    const savedUser = await userApp.save(mockUser);

    expect(savedUser?.id).toBe(mockUser.id);

    const passwordIsValid = await comparePasswords(
      "1234",
      savedUser?.password ?? "",
    );
    expect(passwordIsValid).toBeTruthy();
  });

  test("should validate an invalid password", async () => {
    const savedUser = await userApp.save(mockUser);

    expect(savedUser?.id).toBe(mockUser.id);

    const passwordIsValid = await comparePasswords(
      "12345",
      savedUser?.password ?? "",
    );
    expect(passwordIsValid).toBeFalsy();
  });
});
