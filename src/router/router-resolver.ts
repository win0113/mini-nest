import {
  METHOD_METADATA,
  PATH_METADATA,
  RequestMethod,
  RoutePathProperties,
} from "../define";
import { HttpAdapter } from "../http-adapter";
import { Container } from "../injector/container";
import { Module } from "../injector/module";
import { isConstructor, isFunction } from "../utils";
import { createProxy } from "./router-proxy";

function mappingToRouterMethod(target, requestMethod: RequestMethod) {
  switch (requestMethod) {
    case RequestMethod.POST:
      return target.post;
    case RequestMethod.ALL:
      return target.all;
    case RequestMethod.DELETE:
      return target.delete;
    case RequestMethod.PUT:
      return target.put;
    case RequestMethod.PATCH:
      return target.patch;
    case RequestMethod.OPTIONS:
      return target.options;
    case RequestMethod.HEAD:
      return target.head;
    default: {
      return target.get;
    }
  }
}

export class RouterResolver {
  constructor(private container: Container, private httpAdapter: HttpAdapter) {}

  resolve() {
    const modules = [...this.container.modules.values()];
    const controllers = modules.flatMap((module) => [
      ...module.controllers.values(),
    ]);
    for (const controller of controllers) {
      const routePathProperties = this.scanForPaths(controller.instance);
      for (const {
        requestMethod,
        targetCallback,
        path,
      } of routePathProperties) {
        if (!path) return;
        const methodRef = mappingToRouterMethod(
          this.httpAdapter,
          requestMethod
        ).bind(this.httpAdapter);
        const proxy = createProxy(targetCallback);
        methodRef(path, proxy);
      }
    }
  }

  scanForPaths(instance) {
    const prototype = Reflect.getPrototypeOf(instance);
    return this.scanRoutePathPropertiesFromPrototype(prototype);
  }

  scanRoutePathPropertiesFromPrototype(prototype: any): RoutePathProperties[] {
    const methodNames = this.scanMethodNamesFromPrototype(prototype);
    return methodNames.map((methodName) => {
      const methodFunc = prototype[methodName];
      const requestMethod = Reflect.getMetadata(METHOD_METADATA, methodFunc);
      const path = Reflect.getMetadata(PATH_METADATA, methodFunc);
      return {
        requestMethod: requestMethod,
        targetCallback: methodFunc,
        methodName,
        path,
      } as unknown as RoutePathProperties;
    });
  }

  scanMethodNamesFromPrototype(prototype: any) {
    return Object.getOwnPropertyNames(prototype).filter((propertyName) => {
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
