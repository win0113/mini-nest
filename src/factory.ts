import "reflect-metadata";
import { Type } from "./define";
import { Container } from "./injector/container";
import { InstanceLoader } from "./injector/instance-loader";
import { DependenciesScanner } from "./scanner/dependencies-scanner";
import { Application } from "./application";
import { HttpAdapter } from "./http-adapter";

export const create = (module: Type<unknown>) => {
  const container = new Container();
  initialize(module, container);
  const app = new Application(new HttpAdapter(),container);
  app.listen(3000);
  const moduleA = container.modules.get("ModuleA");
  const controllerA = moduleA.controllers.get("ControllerA");

  controllerA.instance["log"]();
};

export const initialize = (module: Type<unknown>, container: Container) => {
  const instanceLoader = new InstanceLoader(container);
  const dependenciesScanner = new DependenciesScanner(container);
  dependenciesScanner.scan(module);
  instanceLoader.initAllInstances();
};
