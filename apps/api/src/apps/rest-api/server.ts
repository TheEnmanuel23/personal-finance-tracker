import "dotenv/config";
import express from "express";
import type { Express } from "express";
import type http from "http";
import cors from "cors";
import { userRouter } from "./routes/user.route";
import { authRouter } from "./routes/auth.route";
import { walletRouter } from "./routes/wallet.route";
import { transactionRouter } from "./routes/transaction.route";
import { authController } from "./dependencies/auth.dependency";

export class RestServer {
  private readonly express: Express;
  readonly port: string;
  httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();

    this.express.use(express.json());
    this.express.use(cors());

    // Register routes
    this.express.use("/auth", authRouter);
    this.express.use(
      "/user",
      authController.validateUser.bind(authController),
      userRouter,
    );
    this.express.use(
      "/wallet",
      authController.validateUser.bind(authController),
      walletRouter,
    );
    this.express.use(
      "/transaction",
      authController.validateUser.bind(authController),
      transactionRouter,
    );
  }

  async listen(): Promise<void> {
    await new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`[APP] - Starting application on port ${this.port}`);
        resolve("resolved");
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    await new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            reject(error);
          }
          resolve("resolved");
        });
      }

      resolve("resolved");
    });
  }
}
