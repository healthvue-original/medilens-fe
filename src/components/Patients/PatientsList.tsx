import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { PatientTableView } from "./PatientTableView";
import { Patient } from "./types";

export default function PatientsList(): JSX.Element {
  const obj = useLoaderData() as { patients: Patient[] };
  console.log(obj);

  return (
    <div className="p-8 h-full flex flex-col">
      <div style={{}} className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={obj.patients}>
            {(resolvedData) => <PatientTableView data={resolvedData} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
