import { createReqTransformers } from "./transformers/reqTransformer";
import { createResTransformers } from "./transformers/resTransformers";
import { API, createAPIProps, FetchOptions } from "./types";
import { asyncPipe, constructURL, deepMerge } from "./utils";

export function createAPI({ org }: createAPIProps): API {
  const defaultFetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  } as RequestInit;

  const setFetchOptions = (options: RequestInit): RequestInit =>
    deepMerge(defaultFetchOptions, options);

  const reqTransformers = createReqTransformers({
    org,
    setFetchOptions,
    constructURL,
  });
  const resTransformers = createResTransformers({
    org,
    setFetchOptions,
    constructURL,
  });

  async function fetchAPI(fetchOptions: FetchOptions): Promise<any> {
    const { url, ...userOptions } = fetchOptions;
    const mergedFetchOptions = deepMerge({}, defaultFetchOptions, userOptions);
    return fetch(url, mergedFetchOptions);
  }
  return {
    getPatients: asyncPipe(
      reqTransformers.getPatients,
      fetchAPI,
      resTransformers.getPatients
    ),
    addPatient: asyncPipe(
      reqTransformers.addPatient,
      fetchAPI,
      resTransformers.addPatient
    ),
  };
}
