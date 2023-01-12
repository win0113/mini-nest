import { HttpAdapter } from "./http-adapter";
import { Container } from "./injector/container";
import { RouterResolver } from "./router/router-resolver";

export class Application {
  private readonly routeResolver: RouterResolver;
  constructor(private container: Container, private httpAdapter: HttpAdapter) {
    this.routeResolver = new RouterResolver(this.container, this.httpAdapter);
  }

  init() {
    this.routeResolver.resolve();
  }

  listen(port: number) {
    this.init();
    this.httpAdapter.listen(port);
  }
}
