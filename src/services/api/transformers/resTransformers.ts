import { waitFor } from "@/lib/utils";
import { ResTransformer, TransformerProps } from "../types";

export const createResTransformers = (
  props: TransformerProps
): Record<string, ResTransformer<Response, any>> => {
  return {
    getPatients: async (response): Promise<any> => {
      const data = await response.json();
      return data;
    },
    addPatient: async (response): Promise<any> => {
      const resp = await response.json();
      return waitFor(3000, resp);
    },
  };
};
