import type { NextFunction, Request, Response } from "express";
import { validateJWT } from "../../../lib/auth";

export const protectedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearerToken = req.headers.authorization ?? "";

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  validateJWT(token)
    .then((res) => {
      next();
    })
    .catch(() => {
      return res.sendStatus(403);
    });
};
