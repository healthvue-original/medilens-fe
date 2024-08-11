import { Comment } from "../models";
import { API, ResTransformer, TransformerProps } from "../types";
import { parseHeaders } from "../utils";
import Cookies from "js-cookie";

export const createResTransformers = (
  props: TransformerProps
): Record<keyof Omit<API, "logout">, ResTransformer<Response, any>> => {
  return {
    createOrg: async (response): Promise<any> => {
      const data = await response.json();
      const headers = parseHeaders(response.headers);
      const token = headers.authorization;
      props.setFetchOptions({
        headers: {
          Authorization: token,
        },
      });

      Cookies.set("authToken", token);
      return data;
    },
    login: async (response): Promise<any> => {
      const data = await response.json();
      const headers = parseHeaders(response.headers);
      const token = headers.authorization;
      props.setFetchOptions({
        headers: {
          Authorization: token,
        },
      });

      Cookies.set("authToken", token);

      return data ?? [];
    },

    getUserData: async (response): Promise<any> => {
      const data = await response.json();
      return data;
    },

    getAllUsers: async (response): Promise<any> => {
      const res = await response.json();
      return res.data?.users ?? [];
    },

    getPatients: async (response): Promise<any> => {
      const data = await response.json();
      return data.patients ?? [];
    },
    addPatient: async (response): Promise<any> => {
      const resp = await response.json();
      return resp;
    },

    getCases: async (response): Promise<any> => {
      const resp = await response.json();
      return resp?.data.cases ?? [];
    },
    addCase: async (response): Promise<any> => {
      const resp = await response.json();
      return resp;
    },
    updateCase: async (response): Promise<any> => {
      const resp = await response.json();
      return resp;
    },

    getHospitals: async (response): Promise<any> => {
      const resp = await response.json();
      return resp?.data?.hospitals ?? [];
    },
    addHospital: async (response): Promise<any> => {
      const resp = await response.json();
      return resp;
    },

    getGroups: async (response): Promise<any> => {
      const data = await response.json();
      return data?.groups ?? [];
    },
    addGroup: async (response): Promise<any> => {
      const resp = await response.json();
      return resp;
    },

    getSpecimens: async (response): Promise<any> => {
      const resp = await response.json();
      return resp.data?.specimens ?? [];
    },
    addSpecimen: async (response): Promise<any> => {
      const resp = await response.json();
      return resp;
    },

    getScanners: async (response): Promise<any> => {
      const resp = await response.json();
      return resp.data?.scanners ?? [];
    },
    addScanner: async (response): Promise<any> => {
      const resp = await response.json();
      return resp;
    },

    getScanJobs: async (response): Promise<any> => {
      const resp = await response.json();
      return resp.data?.jobs ?? [];
    },
    addScanJob: async (response): Promise<any> => {
      const resp = await response.json();
      return resp;
    },

    getComments: async (response): Promise<Comment[]> => {
      const resp = await response.json();
      return resp.data?.comments;
    },

    addComment: async (response): Promise<Comment> => {
      const resp = await response.json();
      return resp;
    },
  };
};
