import { CaseModel, ScanJobModel, ScannerModel } from "@/services/api/models";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { ScanJobsTableView } from "./ScanJobsTableView";

export default function ScanJobsList(): JSX.Element {
  const { scanJobs, scanners, cases } = useLoaderData() as {
    scanJobs: ScanJobModel[];
    scanners: ScannerModel[];
    cases: CaseModel[];
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <Suspense>
        <Await resolve={Promise.all([scanJobs, cases, scanners])}>
          {([scanJobs, cases, scanners]) => (
            <ScanJobsTableView
              scanJobs={scanJobs}
              scanners={scanners}
              cases={cases}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
