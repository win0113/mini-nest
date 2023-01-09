import {
  InstanceWrapper,
  PARAMTYPES_METADATA,
  SELF_DECLARED_DEPS_METADATA,
  Type,
} from "../define";
import { Module } from "./module";

export const resolveConstructorParams = <T>(
  wrapper: InstanceWrapper<T>,
  module: Module,
  callback: (instances: any[]) => void
) => {
  const { type } = wrapper;
  const paramtypes = reflectConstructorParams<T>(type);
  callback(
    paramtypes.map((paramtype) => resolveSingleParam(paramtype, module))
  );
};

const resolveSingleParam = (paramtype: Type<any>, module: Module) => {
  const providers = module.providers;
  // 如果此模块没有此实例，需要到相关的module中寻找
  return providers.get(paramtype.name).instance;
};

const reflectConstructorParams = <T>(type: Type<T>) => {
  const paramtypes = Reflect.getMetadata(PARAMTYPES_METADATA, type) || [];
  const selfParams = reflectSelfParams<T>(type);
  console.log("paramtypes", paramtypes);
  selfParams.forEach(({ index, param }) => (paramtypes[index] = param));
  return paramtypes;
};

const reflectSelfParams = <T>(type: Type<T>) => {
  return Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, type) || [];
};
