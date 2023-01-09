import { Container } from "./container";
import * as Injector from "./injector";
import { Module } from "./module";

export class InstanceLoader {
  constructor(private readonly container: Container) {}
  initAllInstances() {
    const modules = this.container.modules;
    this.createPrototypes(modules);
    this.createInstances(modules);
  }

  createPrototypes(modules: Map<string, Module>) {
    modules.forEach((module, token) => {
      this.createPrototypeOfProvider(module);
      this.createPrototypeOfController(module);
    });
  }

  createInstances(modules: Map<string, Module>) {
    modules.forEach((module, token) => {
      this.createInstanceOfProvider(module);
      this.createInstanceOfController(module);
    });
  }

  createPrototypeOfController(module: Module) {
    for (const [_, wrapper] of module.controllers) {
      Injector.loadPrototypeOfInstance(wrapper, module.controllers);
    }
  }

  createInstanceOfController(module: Module) {
    for (const [_, wrapper] of module.controllers) {
      Injector.loadInstance(wrapper, module.controllers, module);
    }
  }

  createPrototypeOfProvider(module: Module) {
    for (const [_, wrapper] of module.providers) {
      Injector.loadPrototypeOfInstance(wrapper, module.providers);
    }
  }

  createInstanceOfProvider(module: Module) {
    for (const [_, wrapper] of module.providers) {
      Injector.loadInstance(wrapper, module.providers, module);
    }
  }
}
