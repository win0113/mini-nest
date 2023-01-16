import { METHOD_METADATA, PATH_METADATA, RequestMethod } from "../define";

interface MethodMetadata {
  path: string;
  method: RequestMethod;
}

const RequestMapping = (meta: MethodMetadata): MethodDecorator => {
  const requestMethod = meta.method || RequestMethod.GET;
  const path = meta.path || "/";
  return (target: Object, propertyKey: string | symbol, descriptor) => {
    Reflect.defineMetadata(METHOD_METADATA, requestMethod, descriptor.value);
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    return descriptor;
  };
};

const CreateRequestDecorator = (method: RequestMethod) => (path?: string) => {
  return RequestMapping({
    method,
    path,
  });
};

export const Post = CreateRequestDecorator(RequestMethod.POST);
export const Get = CreateRequestDecorator(RequestMethod.GET);
export const Patch = CreateRequestDecorator(RequestMethod.PATCH);
export const Delete = CreateRequestDecorator(RequestMethod.DELETE);
export const Put = CreateRequestDecorator(RequestMethod.PUT);
export const All = CreateRequestDecorator(RequestMethod.ALL);
