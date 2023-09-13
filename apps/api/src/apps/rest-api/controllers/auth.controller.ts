import type { AuthApp } from "contexts/application/auth";
import type { Request, Response } from "express";

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
    res.status(201).json(user);
  }
}
