import { createAPI } from "@/services/api";
import { ScanJobsTableView } from "./ScanJobsTableView";

const api = createAPI({ org: "healthvue" });

export default async function ScansPage() {
  const [scanJobs, scanners, cases] = await Promise.all([
    api.getScanJobs(),
    api.getScanners(),
    api.getCases(),
  ]);

  return (
    <div className="p-8 h-full flex flex-col">
      <ScanJobsTableView
        scanJobs={scanJobs}
        scanners={scanners}
        cases={cases}
      />
    </div>
  );
}
