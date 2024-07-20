import { Case, Hospital, Patient } from "@/services/api/models";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { CasesTableView } from "./CasesTableView";

export default function CasesList(): JSX.Element {
  const { cases, patients, hospitals } = useLoaderData() as {
    cases: Case[];
    patients: Patient[];
    hospitals: Hospital[];
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <Suspense>
        <Await resolve={Promise.all([cases, patients, hospitals])}>
          {([cases, patients, hospitals]) => (
            <CasesTableView
              cases={cases}
              patients={patients}
              hospitals={hospitals}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
