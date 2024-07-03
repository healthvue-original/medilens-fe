import { AsyncTask, ObjectType } from "./types";

export const API_HOST = import.meta.env.PROD
  ? "https://gently-concise-dogfish.ngrok-free.app/healthvue-server"
  : "http://localhost:8080";

export const constructURL = (url: string): string => {
  return `${API_HOST}${url}`;
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
