import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const comparePasswords = async (
  plainTextPassword: string,
  hashedPassword: string
) => await bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = async (user: { id: string, email: string }) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return await new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.payload as any;
};
