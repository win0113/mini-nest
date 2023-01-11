import { Type } from "./define";
import { Container } from "./injector/container";
import { InstanceLoader } from "./injector/instance-loader";
import { DependenciesScanner } from "./scanner/dependencies-scanner";
import "reflect-metadata";
export const create = (module: Type<unknown>) => {
  const container = new Container();
  initialize(module, container);
  const moduleA = container.modules.get("ModuleA");
  const controllerA = moduleA.controllers.get('ControllerA')
  
  controllerA.instance['log']()
};

export const initialize = (module: Type<unknown>, container: Container) => {
  const instanceLoader = new InstanceLoader(container);
  const dependenciesScanner = new DependenciesScanner(container);
  dependenciesScanner.scan(module);
  instanceLoader.initAllInstances();
};
