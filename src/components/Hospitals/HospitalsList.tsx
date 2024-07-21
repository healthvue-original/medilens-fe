import { Hospital } from "@/services/api/models";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { HospitalsTableView } from "./HospitalsTableView";

export default function CasesList(): JSX.Element {
  const { hospitals } = useLoaderData() as {
    hospitals: Hospital[];
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <Suspense>
        <Await resolve={Promise.all([hospitals])}>
          {([hospitals]) => (
            <HospitalsTableView
              hospitals={hospitals}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
