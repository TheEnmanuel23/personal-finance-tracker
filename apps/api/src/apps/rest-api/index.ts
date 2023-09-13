import { RestServer } from "./server";

export class RestApi {
  server?: RestServer;

  async start() {
    const port = process.env.PORT ?? "8000";

    this.server = new RestServer(port);

    await this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  stop() {
    this.server?.stop();
  }
}
