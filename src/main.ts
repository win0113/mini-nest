import "reflect-metadata";

export const PARAMTYPES_METADATA = "design:paramtypes";
export const SELF_DECLARED_DEPS_METADATA = "self:paramtypes";

export interface Metatype<T> {
  new (...args: any[]): T;
}

export function Component(): ClassDecorator {
  return (target: object) => {};
}

export function flatten<T extends Array<unknown> = any>(
  arr: T
): T extends Array<infer R> ? R : never {
  const flat = [].concat(...arr);
  return flat.some(Array.isArray) ? flatten(flat) : flat;
}

@Component()
class B {}

@Component()
class A {
  constructor(private a: string, public b: B) {}
}

class Injector {
  public reflectConstructorParams<T>(type: Metatype<T>): any[] {
    const paramtypes = Reflect.getMetadata(PARAMTYPES_METADATA, type) || [];
    const selfParams = this.reflectSelfParams<T>(type);
    console.log("paramtypes", paramtypes);
    selfParams.forEach(({ index, param }) => (paramtypes[index] = param));
    return paramtypes;
  }

  public reflectSelfParams<T>(type: Metatype<T>): any[] {
    return Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, type) || [];
  }

  public test() {
    const type = Object.create(A.prototype);
    console.log("type", A);
    console.log("result", this.reflectConstructorParams(A));
  }
}

new Injector().test();
