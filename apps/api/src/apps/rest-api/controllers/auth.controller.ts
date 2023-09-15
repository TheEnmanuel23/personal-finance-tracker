import type { AuthApp } from "contexts/application/auth";
import type { NextFunction, Request, Response } from "express";

export class AuthController {
  constructor(private readonly authApp: AuthApp) {}

  async signIn(req: Request, res: Response) {
    const user = await this.authApp.login(req.body.email, req.body.password);

    if (!user) {
      return res.status(401).json({});
    }

    res.status(201).json(user);
  }

  async signUp(req: Request, res: Response) {
    const user = await this.authApp.register(req.body);
    if (!user) {
      return res.sendStatus(409);
    }
    res.status(201).json(user);
  }

  validateUser(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization ?? "";

    const token = bearerToken.split(" ")[1];

    if (!token) {
      return res.sendStatus(401);
    }

    this.authApp
      .validateUser(token)
      .then((user) => {
        if (!user) {
          return res.sendStatus(401);
        }

        next();
      })
      .catch(() => {
        return res.sendStatus(401);
      });
  }
}
