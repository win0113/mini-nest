import { Controller, Injectable, Type } from "../define";
import { Module } from "./module";
import * as ModuleTokenFactory from "./module-token-factory";

export class Container {
  public readonly modules: Map<string, Module>;

  addModule(type: Type<unknown>) {
    const token = ModuleTokenFactory.create(type);
    if (this.modules.has(token)) {
      return;
    }

    this.modules.set(token, new Module(type));
  }

  addRelatedModule(type: Type<unknown>, token: string) {
    const currentModule = this.modules.get(token);
    const relatedToken = ModuleTokenFactory.create(type);
    const relatedModule = this.modules.get(relatedToken);
    currentModule.addRelatedModule(relatedModule);
  }

  addController(controller: Type<Controller>, token: string) {
    const currentModule = this.modules.get(token);
    currentModule.addController(controller);
  }

  addProvider(provider: Type<Injectable>, token: string) {
    const currentModule = this.modules.get(token);
    currentModule.addProvider(provider);
  }

  addExport(exportProvider: Type<Injectable>, token: string) {
    const currentModule = this.modules.get(token);
    currentModule.addExport(exportProvider);
  }

  extractMetadata(type: Type<unknown>) {
    return { type: type };
  }
}
