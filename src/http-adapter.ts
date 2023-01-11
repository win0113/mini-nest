import * as http from "http";

interface AbstractHttpAdapter {
  listen(port: number): void;
}

export class HttpAdapter implements AbstractHttpAdapter {
  private httpServer: http.Server;

  constructor() {
    this.httpServer = http.createServer();
  }

  listen(port: number) {
    this.httpServer.listen(port);
  }
}
