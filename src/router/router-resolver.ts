import { METHOD_METADATA, PATH_METADATA } from "../define";
import { HttpAdapter } from "../http-adapter";
import { Container } from "../injector/container";
import { Module } from "../injector/module";
import { isConstructor, isFunction } from "../utils";

export class RouterResolver {
  constructor(private container: Container, private httpAdapter: HttpAdapter) {}

  resolve() {
    this.scanForPaths();
  }

  scanForPaths() {
    const modules = [...this.container.modules.values()];
    const controllers = modules.flatMap((module) => [
      ...module.controllers.values(),
    ]);
    return controllers.map((controller) => {
      const prototype = Reflect.getPrototypeOf(controller);
      return this.scanRouteMetadataFromPrototype(prototype);
    });
  }

  scanRouteMetadataFromPrototype(prototype: any) {
    const methodNames = this.scanMethodNamesFromPrototype(prototype);
    methodNames.map((methodName) => {
      const methodFunc = prototype[methodName];
      const requestMethod = Reflect.getMetadata(METHOD_METADATA, methodFunc);
      const path = Reflect.getMetadata(PATH_METADATA, methodFunc);
      return {
        requestMethod: requestMethod,
        methodFunc: methodFunc,
        methodName,
        path,
      };
    });
  }

  scanMethodNamesFromPrototype(prototype: any) {
    return Reflect.ownKeys(prototype).filter((propertyName) => {
      const descriptor = Reflect.getOwnPropertyDescriptor(
        prototype,
        propertyName
      );
      if (descriptor.get || descriptor.set) {
        return false;
      }

      return (
        !isConstructor(propertyName) && isFunction(prototype[propertyName])
      );
    });
  }
}
