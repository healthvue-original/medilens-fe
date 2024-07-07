import { CommentModel } from "../models";
import { API, ResTransformer, TransformerProps } from "../types";

export const createResTransformers = (
  props: TransformerProps
): Record<keyof API, ResTransformer<Response, any>> => {
  return {
    isAuthenticated: async (response): Promise<any> => {
      const resp = true;
      return resp;
    },
    getUserData: async (response): Promise<any> => {
      const resp = { id: 1, name: "Navin" };
      return resp;
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

    getComments: async (response): Promise<CommentModel[]> => {
      const resp = await response.json();
      return (
        resp.data?.comments?.map((com: CommentModel) => ({
          ...com,
          comment: JSON.parse(com.comment),
        })) ?? []
      );
    },

    addComment: async (response): Promise<CommentModel> => {
      const resp = await response.json();
      return resp;
    },
  };
};
