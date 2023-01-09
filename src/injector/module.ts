import { Injectable, InstanceWrapper, Controller, Type } from "../define";

export class Module {
  public readonly imports = new Set<Module>();
  public readonly exports = new Set<string>();
  public readonly providers = new Map<string, InstanceWrapper<Injectable>>();
  public readonly controllers = new Map<string, InstanceWrapper<Controller>>();
  constructor(public type: Type<unknown>) {}

  addRelatedModule(relatedModule: Module) {
    this.imports.add(relatedModule);
  }

  addController(type: Type<Controller>) {
    this.controllers.set(type.name, {
      name: type.name,
      type: type,
      instance: null,
    });
  }

  addProvider(type: Type<Injectable>) {
    this.providers.set(type.name, {
      name: type.name,
      type: type,
      instance: null,
    });
  }

  addExport(type: Type<Injectable>) {
    this.exports.add(type.name);
  }
}
