import { PatientModel } from "@/services/api/models";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { PatientTableView } from "./PatientTableView";

export default function PatientsList(): JSX.Element {
  const { patients } = useLoaderData() as { patients: PatientModel[] };

  return (
    <div className="p-8 h-full flex flex-col">
      <Suspense>
        <Await resolve={patients}>
          {(patients) => <PatientTableView data={patients} />}
        </Await>
      </Suspense>
    </div>
  );
}
