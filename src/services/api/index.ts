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
    getUserData: asyncPipe(
      reqTransformers.getUserData,
      fetchAPI,
      resTransformers.getUserData
    ),

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

    getCases: asyncPipe(
      reqTransformers.getCases,
      fetchAPI,
      resTransformers.getCases
    ),
    addCase: asyncPipe(
      reqTransformers.addCase,
      fetchAPI,
      resTransformers.addCase
    ),

    getHospitals: asyncPipe(
      reqTransformers.getHospitals,
      fetchAPI,
      resTransformers.getHospitals
    ),
    addHospital: asyncPipe(
      reqTransformers.addHospital,
      fetchAPI,
      resTransformers.addHospital
    ),

    getGroups: asyncPipe(
      reqTransformers.getGroups,
      fetchAPI,
      resTransformers.getGroups
    ),
    addGroup: asyncPipe(
      reqTransformers.addGroup,
      fetchAPI,
      resTransformers.addGroup
    ),

    getSpecimens: asyncPipe(
      reqTransformers.getSpecimens,
      fetchAPI,
      resTransformers.getSpecimens
    ),
    addSpecimen: asyncPipe(
      reqTransformers.addSpecimen,
      fetchAPI,
      resTransformers.addSpecimen
    ),

    getScanners: asyncPipe(
      reqTransformers.getScanners,
      fetchAPI,
      resTransformers.getScanners
    ),
    addScanner: asyncPipe(
      reqTransformers.addScanner,
      fetchAPI,
      resTransformers.addScanner
    ),

    getScanJobs: asyncPipe(
      reqTransformers.getScanJobs,
      fetchAPI,
      resTransformers.getScanJobs
    ),
    addScanJob: asyncPipe(
      reqTransformers.addScanJob,
      fetchAPI,
      resTransformers.addScanJob
    ),
  };
}
