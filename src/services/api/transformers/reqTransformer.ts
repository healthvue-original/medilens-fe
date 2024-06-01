import { ReqTransformer, TransformerProps } from "../types";

export const createReqTransformers = ({
  constructURL,
}: TransformerProps): Record<string, ReqTransformer<any>> => {
  return {
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
  };
};
