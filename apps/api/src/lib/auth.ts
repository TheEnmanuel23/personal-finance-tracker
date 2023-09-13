import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => await bcrypt.hash(password, 10);

export const comparePasswords = async (
  plainTextPassword: string,
  hashedPassword: string
) => await bcrypt.compare(plainTextPassword, hashedPassword);
