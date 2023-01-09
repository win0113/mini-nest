import { Type } from "../define";

export const create = (type: Type<unknown>) => {
  return JSON.stringify({ module: type.name });
};


