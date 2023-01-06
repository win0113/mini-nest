export interface InstallWrapper<T> {}

export type Injectable = object;
export type Controller = object;

export interface Metatype<T> {
  new (...args: any[]): T;
}
