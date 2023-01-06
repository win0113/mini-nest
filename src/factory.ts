import { Metatype } from "./define";
import { Container } from "./injector/container";
import { InstanceLoader } from "./injector/instance-loader";
import { DependenciesScanner } from "./scanner/dependencies-scanner";

export const create = (module: Metatype<unknown>) => {
  const container = new Container();
  initialize(module, container);
};

export const initialize = (module: Metatype<unknown>, container: Container) => {
//   const instanceLoader = new InstanceLoader(container);
  const dependenciesScanner = new DependenciesScanner(container);
  dependenciesScanner.scan(module);
//   instanceLoader.initAllInstances();
};
