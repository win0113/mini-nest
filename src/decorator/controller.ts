import "reflect-metadata";

export function Controller(prefix?: string): ClassDecorator {
  return (target: Function) => {
    // Reflect.defineMetadata(property, metadata[property], target);
  };
}
