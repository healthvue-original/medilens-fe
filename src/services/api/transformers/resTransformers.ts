import { waitFor } from "@/lib/utils";
import { API, ResTransformer, TransformerProps } from "../types";

export const createResTransformers = (
  props: TransformerProps
): Record<keyof API, ResTransformer<Response, any>> => {
  return {
    getUserData: async (response): Promise<any> => {
      const resp = { id: 1, name: "Navin" };
      return waitFor(3000, resp);
    },
    getPatients: async (response): Promise<any> => {
      const data = await response.json();
      return data.patients ?? [];
    },
    addPatient: async (response): Promise<any> => {
      const resp = await response.json();
      return waitFor(3000, resp);
    },

    getCases: async (response): Promise<any> => {
      const resp = await response.json();
      return resp?.data.cases ?? [];
    },
    addCase: async (response): Promise<any> => {
      const resp = await response.json();
      return waitFor(3000, resp);
    },

    getHospitals: async (response): Promise<any> => {
      const resp = await response.json();
      return resp?.data?.hospitals ?? [];
    },
    addHospital: async (response): Promise<any> => {
      const resp = await response.json();
      return waitFor(3000, resp);
    },

    getGroups: async (response): Promise<any> => {
      const data = await response.json();
      return data?.groups ?? [];
    },
    addGroup: async (response): Promise<any> => {
      const resp = await response.json();
      return waitFor(3000, resp);
    },

    getSpecimens: async (response): Promise<any> => {
      const data = await response.json();
      return data?.specimens ?? [];
    },
    addSpecimen: async (response): Promise<any> => {
      const resp = await response.json();
      return waitFor(3000, resp);
    },

    getScanners: async (response): Promise<any> => {
      const data = await response.json();
      return data?.scanners ?? [];
    },
    addScanner: async (response): Promise<any> => {
      const resp = await response.json();
      return waitFor(3000, resp);
    },

    getScanJobs: async (response): Promise<any> => {
      const data = await response.json();
      return data?.scanJobs ?? [];
    },
    addScanJob: async (response): Promise<any> => {
      const resp = await response.json();
      return waitFor(3000, resp);
    },
  };
};
