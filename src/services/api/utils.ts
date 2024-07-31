import { AsyncTask, ObjectType } from "./types";
import Cookies from "js-cookie";

export const API_HOST = import.meta.env.PROD
  ? "https://gently-concise-dogfish.ngrok-free.app/healthvue-server"
  : "http://localhost:8080";

export const constructURL = (url: string): string => {
  return `${API_HOST}${url}`;
};

export const parseHeaders = (headers: Headers): Record<string, string> => {
  const entries = Array.from(headers.entries());
  return entries.reduce<Record<string, string>>((acc, [k, v]) => {
    acc[k] = v;
    return acc;
  }, {});
};

export const getAuthTokenFromCookies = () => {
  const token = Cookies.get("authToken");
  return token;
};

export const removeAuthTokenFromCookies = () => {
  Cookies.remove("authToken");
};

export const asyncPipe =
  <T, U>(...tasks: AsyncTask<any, any>[]) =>
  (initialValue?: T): Promise<U> => {
    return tasks.reduce<Promise<any>>((acc, task) => {
      return acc.then(task).catch((err) => {
        throw err;
      });
    }, Promise.resolve(initialValue));
  };

const isObject = (val: any): boolean =>
  val instanceof Object && !(val instanceof Array);

// util to deep merge objects.
export const deepMerge = (
  dest: ObjectType,
  ...sources: Array<ObjectType>
): ObjectType => {
  return sources.reduce((destAcc, source) => {
    const keys = Object.keys(source);
    keys.forEach((key) => {
      if (key in destAcc) {
        if (isObject(source[key]) && isObject(destAcc[key])) {
          destAcc[key] = deepMerge(
            destAcc[key] as ObjectType,
            source[key] as ObjectType
          );
        } else {
          destAcc[key] = source[key];
        }
      } else {
        destAcc[key] = source[key];
      }
    });
    return destAcc;
  }, dest);
};

export const redirectTo = (path: string) => window.location.replace(path);
