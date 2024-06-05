import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Patient } from "../Patients/types";
import { CasesTableView } from "./CasesTableView";
import { Case } from "./types";

export default function PatientsList(): JSX.Element {
  const { cases, patients } = useLoaderData() as {
    cases: Case[];
    patients: Patient[];
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div style={{}} className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={Promise.all([cases, patients])}>
            {([cases, patients]) => (
              <CasesTableView cases={cases} patients={patients} />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
