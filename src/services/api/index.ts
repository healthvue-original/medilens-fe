import { createReqTransformers } from "./transformers/reqTransformer";
import { createResTransformers } from "./transformers/resTransformers";
import { API, createAPIProps, FetchOptions, ResTransformer } from "./types";
import {
  asyncPipe,
  constructURL,
  deepMerge,
  getAuthTokenFromCookies,
  redirectTo,
  removeAuthTokenFromCookies,
} from "./utils";

export function createAPI({ org }: createAPIProps): API {
  const defaultFetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthTokenFromCookies(),
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

  const withAuth =
    (next: ResTransformer<Response, any>) =>
    (response: Response): Promise<Response> => {
      if (!response.ok) {
        if (response.status === 401) {
          redirectTo("/auth");
        }
      }
      return next(response);
    };

  return {
    createOrg: asyncPipe(
      reqTransformers.createOrg,
      fetchAPI,
      resTransformers.createOrg
    ),
    login: asyncPipe(reqTransformers.login, fetchAPI, resTransformers.login),

    logout: async () => {
      removeAuthTokenFromCookies();
    },

    getUserData: asyncPipe(
      reqTransformers.getUserData,
      fetchAPI,
      resTransformers.getUserData
    ),

    getPatients: asyncPipe(
      reqTransformers.getPatients,
      fetchAPI,
      withAuth(resTransformers.getPatients)
    ),
    addPatient: asyncPipe(
      reqTransformers.addPatient,
      fetchAPI,
      withAuth(resTransformers.addPatient)
    ),

    getCases: asyncPipe(
      reqTransformers.getCases,
      fetchAPI,
      withAuth(resTransformers.getCases)
    ),
    addCase: asyncPipe(
      reqTransformers.addCase,
      fetchAPI,
      withAuth(resTransformers.addCase)
    ),
    updateCase: asyncPipe(
      reqTransformers.updateCase,
      fetchAPI,
      withAuth(resTransformers.updateCase)
    ),

    getHospitals: asyncPipe(
      reqTransformers.getHospitals,
      fetchAPI,
      withAuth(resTransformers.getHospitals)
    ),
    addHospital: asyncPipe(
      reqTransformers.addHospital,
      fetchAPI,
      withAuth(resTransformers.addHospital)
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
    getComments: asyncPipe(
      reqTransformers.getComments,
      fetchAPI,
      resTransformers.getComments
    ),
    addComment: asyncPipe(
      reqTransformers.addComment,
      fetchAPI,
      resTransformers.addComment
    ),
  };
}

export const api = createAPI({ org: "healthvue" });
