import type { UserApp } from "contexts/application/user";
import type { Request, Response } from "express";

export class UserController {
  constructor(private readonly userApp: UserApp) {}

  async save(req: Request, res: Response) {
    const user = await this.userApp.save(req.body);
    res.json(user);
  }
}
