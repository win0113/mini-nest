import { Controller, Injectable, InstanceWrapper } from "../define";
import { Module } from "./module";
import { resolveConstructorParams } from "./resolve-constructor-params";

export const loadPrototypeOfInstance = <T>(
  { type, name }: InstanceWrapper<T>,
  collection: Map<string, InstanceWrapper<T>>
) => {
  if (!collection) return null;

  const target = collection.get(name);
  if (target.instance) return null;

  collection.set(name, {
    ...collection.get(name),
    instance: Object.create(type.prototype),
  });
};

export const loadInstance = <T>(
  wrapper: InstanceWrapper<T>,
  collection: Map<string, InstanceWrapper<T>>,
  module: Module
) => {
  const { type } = wrapper;
  const currentMetatype = collection.get(wrapper.name);

  resolveConstructorParams(wrapper, module, (instance: any[]) => {
    currentMetatype.instance = Object.assign(
      currentMetatype.instance,
      new type(...instance)
    );
  });
};
