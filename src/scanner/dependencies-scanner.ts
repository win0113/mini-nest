import { Container } from "../injector/container";

export class DependenciesScanner {
  constructor(private readonly container: Container) {}
  scan(module: any) {}
}
