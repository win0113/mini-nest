import { HttpAdapter } from "./http-adapter";
import { Container } from "./injector/container";
import { RouterResolver } from "./router/router-resolver";

export class Application {
  private readonly routeResolver: RouterResolver;
  constructor(private httpAdapter: HttpAdapter, private container: Container) {
    this.routeResolver = new RouterResolver();
  }

  init() {
    this.routeResolver.resolve(this.httpAdapter);
  }

  listen(port: number) {
    this.init();
    this.httpAdapter.listen(port);
  }
}
