import { createAPI } from "@/services/api";
import { PatientTableView } from "./PatientTableView";

const api = createAPI({ org: "healthvue" });

export default async function PatientsPage() {
  const patients = await api.getPatients();

  return (
    <div className="p-8 h-full flex flex-col">
      <PatientTableView data={patients} />
    </div>
  );
}
