import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY } from "@server/constants";

export const omitKeys = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T | null | undefined,
  remove: Array<K>
): Pick<T, Exclude<keyof T, K>> => {
  if (!obj) {
    return {} as any;
  }
  const result = {} as any;
  for (const prop in obj) {
    if (
      !obj.hasOwnProperty ||
      Object.prototype.hasOwnProperty.call(obj, prop)
    ) {
      if (remove.indexOf(prop as unknown as K) === -1) {
        result[prop] = obj[prop];
      }
    }
  }
  return result;
};

export const validateToken = <T>(
  token: string,
  type: "verify" | "decode"
): T => {
  try {
    if (type === "verify") {
      return jwt.verify(token, JWT_SECRET_KEY) as any;
    } else {
      return jwt.decode(token) as any;
    }
  } catch (err: any) {
    return err;
  }
};
