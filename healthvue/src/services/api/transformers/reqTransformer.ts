import { API, ReqTransformer, TransformerProps } from "../types";

export const createReqTransformers = ({
  constructURL,
}: TransformerProps): Record<keyof API, ReqTransformer<any>> => {
  return {
    getUserData: async () => {
      return {
        url: constructURL("/user"),
        method: "GET",
      };
    },
    getPatients: async () => {
      return {
        url: constructURL("/patients"),
        method: "GET",
      };
    },
    addPatient: async (patient) => {
      return {
        url: constructURL("/patients"),
        method: "POST",
        body: JSON.stringify(patient),
      };
    },
    getCases: async () => {
      return {
        url: constructURL("/cases"),
        method: "GET",
      };
    },
    addCase: async (caseObj) => {
      return {
        url: constructURL("/cases"),
        method: "POST",
        body: JSON.stringify(caseObj),
      };
    },

    getHospitals: async () => {
      return {
        url: constructURL("/hospitals"),
        method: "GET",
      };
    },
    addHospital: async (hospital) => {
      return {
        url: constructURL("/hospitals"),
        method: "POST",
        body: JSON.stringify(hospital),
      };
    },

    getGroups: async () => {
      return {
        url: constructURL("/groups"),
        method: "GET",
      };
    },
    addGroup: async (group) => {
      return {
        url: constructURL("/groups"),
        method: "POST",
        body: JSON.stringify(group),
      };
    },

    getSpecimens: async ({ caseId }) => {
      return {
        url: constructURL(`/cases/${caseId}/specimens`),
        method: "GET",
      };
    },
    addSpecimen: async (specimen) => {
      return {
        url: constructURL("/specimens"),
        method: "POST",
        body: JSON.stringify(specimen),
      };
    },

    getScanners: async () => {
      return {
        url: constructURL("/scanners"),
        method: "GET",
      };
    },
    addScanner: async (scanner) => {
      return {
        url: constructURL("/scanners"),
        method: "POST",
        body: JSON.stringify(scanner),
      };
    },

    getScanJobs: async () => {
      return {
        url: constructURL("/scan_jobs"),
        method: "GET",
      };
    },
    addScanJob: async (scan_job) => {
      return {
        url: constructURL(`/scanners/${scan_job.scanner_id}/jobs`),
        method: "POST",
        body: JSON.stringify(scan_job),
      };
    },

    getComments: async ({
      entity,
      entity_id,
    }: {
      entity: string;
      entity_id: number;
    }) => {
      return {
        url: constructURL(`/${entity}/${entity_id}/comments`),
        method: "GET",
      };
    },
    addComment: async ({ entity, entity_id, ...comment }) => {
      return {
        url: constructURL(`/${entity}/${entity_id}/comments`),
        method: "POST",
        body: JSON.stringify({ entity, entity_id, ...comment }),
      };
    },
  };
};
