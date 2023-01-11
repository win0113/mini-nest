import "reflect-metadata";

export function Injectable(): ClassDecorator {
  return (target: Function) => {
    // Reflect.defineMetadata(property, metadata[property], target);
  };
}
