import { Type } from "../define";

export const create = (type: Type<unknown>) => {
  return type.name;
};


