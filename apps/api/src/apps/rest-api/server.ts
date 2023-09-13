import "dotenv/config";
import express from "express";
import type { Express } from "express";
import type http from "http";
import cors from "cors";
import { userRouter } from "./routes/user.route";

export class RestServer {
  private express: Express;
  readonly port: string;
  httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();

    this.express.use(express.json());
    this.express.use(cors());

    // Register routes
    this.express.use("/user", userRouter);
  }

  listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`[APP] - Starting application on port ${this.port}`);
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            reject(error);
          }
          resolve();
        });
      }

      resolve();
    });
  }
}
