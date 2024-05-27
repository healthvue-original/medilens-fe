import { Suspense } from "react";
import { Await, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { Button } from "./ui/button";

export default function Patients(): JSX.Element {
  const { data } = useLoaderData() as { data: string };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data}>
        {(patients) => (
          <div>
            {patients.map((patient) => (
              <div key={patient.id}>
                <p>{patient.name}</p>
                <p>{patient.age}</p>
                <p>{patient.email}</p>
                <p>{patient.phone}</p>
                <p>{patient.sex}</p>
              </div>
            ))}
          </div>
        )}
      </Await>
      <Button>
        <NavLink to={"add"}>Add Patient</NavLink>
      </Button>
      <Outlet />
    </Suspense>
  );
}
