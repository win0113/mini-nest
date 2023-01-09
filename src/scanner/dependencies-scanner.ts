import { Controller, Injectable, METADATA, Type } from "../define";
import { Container } from "../injector/container";

const reflectMetadata = (metaTarget: object, metaKey: string) => {
  return Reflect.getMetadata(metaKey, metaTarget);
};

export class DependenciesScanner {
  constructor(private readonly container: Container) {}
  scan(module: Type<unknown>) {
    this.scanForModule(module);
    this.scanForDependencies();
  }

  scanForModule(module: Type<unknown>) {
    this.insertModule(module);
    const importModules = reflectMetadata(module, METADATA.IMPORTS);
    for (const importModule of importModules) {
      this.scanForModule(importModule);
    }
  }

  insertModule(type: Type<unknown>) {
    this.container.addModule(type);
  }

  insertRelatedModule(type: Type<unknown>, token: string) {
    this.container.addRelatedModule(type, token);
  }

  insertController(type: Type<Controller>, token: string) {
    this.container.addController(type, token);
  }

  insertProvider(type: Type<unknown>, token: string) {
    this.container.addProvider(type, token);
  }

  insertExport(type: Type<unknown>, token: string) {
    this.container.addExport(type, token);
  }

  scanForDependencies() {
    const modules = this.container.modules;
    for (const [token, module] of modules.entries()) {
      const { type } = module;
      this.reflectRelatedModules(type, token);
      this.reflectControllers(type, token);
      this.reflectProviders(type, token);
      this.reflectExports(type, token);
    }
  }

  reflectProviders(type: Type<unknown>, token: string) {
    for (const iterator of reflectMetadata(type, METADATA.PROVIDERS)) {
      this.insertProvider(iterator, token);
    }
  }

  reflectExports(type: Type<unknown>, token: string) {
    for (const iterator of reflectMetadata(type, METADATA.EXPORTS)) {
      this.insertExport(iterator, token);
    }
  }

  reflectRelatedModules(type: Type<unknown>, token: string) {
    for (const iterator of reflectMetadata(type, METADATA.IMPORTS)) {
      this.insertRelatedModule(iterator, token);
    }
  }

  reflectControllers(type: Type<unknown>, token: string) {
    for (const iterator of reflectMetadata(type, METADATA.CONTROLLERS)) {
      this.insertController(iterator, token);
    }
  }
}
