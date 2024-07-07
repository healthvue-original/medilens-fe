import { ScanJobsTableView } from "@/components/ScanJobs/ScanJobsTableView";
import { api } from "@/services/api";
import { CaseModel, ScanJobModel, ScannerModel } from "@/services/api/models";
import { LoaderFunction, useLoaderData } from "react-router";

type ScanJobsLoaderData = {
  scanJobs: ScanJobModel[];
  cases: CaseModel[];
  scanners: ScannerModel[];
};

export const loader: LoaderFunction = async function loader() {
  const [scanJobs, cases, scanners] = await Promise.all([
    api.getScanJobs(),
    api.getCases(),
    api.getScanners(),
  ]);
  return {
    scanJobs,
    cases,
    scanners,
  };
};

function Component(): JSX.Element {
  const { scanJobs, scanners, cases } = useLoaderData() as ScanJobsLoaderData;
  return (
    <section className="scans p-8 h-full flex flex-col">
      <ScanJobsTableView
        scanJobs={scanJobs}
        scanners={scanners}
        cases={cases}
      />
    </section>
  );
}

Component.displayName = "ScansRoute";

export const element = <Component />;
