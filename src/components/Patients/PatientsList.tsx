import { useState } from "react";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Button } from "../ui/button";
import AddPatientDialog from "./AddPatient";
import { PatientTableView } from "./PatientTableView";
import { Patient } from "./types";

export default function PatientsList(): JSX.Element {
  const { patients } = useLoaderData() as { patients: Patient[] };

  const [showAddPatientForm, setShowAddPatientForm] = useState(false);
  return (
    <div className="p-8 h-full flex flex-col">
      <div>
        <Button onClick={() => setShowAddPatientForm(true)}>Add Patient</Button>
        {showAddPatientForm && (
          <AddPatientDialog onClose={() => setShowAddPatientForm(false)} />
        )}
      </div>
      <div style={{ height: "calc(100% - 100px)" }} className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={patients}>
            {(resolvedData) => <PatientTableView data={resolvedData} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
