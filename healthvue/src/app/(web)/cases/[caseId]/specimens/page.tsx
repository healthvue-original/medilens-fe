import { createAPI } from "@/services/api";
import { Specimen } from "./Specimen";

const api = createAPI({ org: "healthvue" });

export default async function SpecimenPage({
  params,
}: {
  params: { caseId: string };
}) {
  const specimens = await api.getSpecimens({ caseId: +params.caseId });
  return <Specimen specimens={specimens} />;
}
