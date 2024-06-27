import { createAPI } from "@/services/api";
import { CasesTableView } from "./CasesTableView";

const api = createAPI({ org: "healthvue" });

export default async function PatientsPage() {
  const [cases, patients, hospitals] = await Promise.all([
    api.getCases(),
    api.getPatients(),
    api.getHospitals(),
  ]);

  return (
    <div className="p-8 h-full flex flex-col">
      <CasesTableView cases={cases} patients={patients} hospitals={hospitals} />
    </div>
  );
}
