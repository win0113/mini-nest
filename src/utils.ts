export const isFunction = (fn): boolean => typeof fn === 'function';
export const isObject = (fn): fn is object => typeof fn === 'object';
export const isString = (fn): fn is string => typeof fn === 'string';
export const isConstructor = (fn): boolean => fn === 'constructor';