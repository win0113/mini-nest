export interface InstanceWrapper<T> {
  name: any;
  type: Type<T>;
  instance: T;
}

export type Injectable = any;
export type Controller = object;

export interface Type<T> {
  new (...args: any[]): T;
}

export const METADATA = {
  PROVIDERS: "providers",
  IMPORTS: "imports",
  CONTROLLERS: "controllers",
  EXPORTS: "exports",
};


export const PARAMTYPES_METADATA = "design:paramtypes";
export const SELF_DECLARED_DEPS_METADATA = "self:paramtypes";
