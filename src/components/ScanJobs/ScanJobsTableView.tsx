import { FaSort } from "react-icons/fa";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { useTableMain } from "../TableView/useTable";
import TableMain from "../TableView/TableBody";
import { Pagination } from "../TableView/Pagination";
import { GlobalFilter } from "../TableView/GlobalFilter";
import { Button } from "../ui/button";
import { CaseModel, ScanJobModel, ScannerModel } from "@/services/api/models";
import AddScanJobDialog from "./AddScanJobDialog";
import { useState } from "react";

const PatientColumnDef: ColumnDef<ScanJobModel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 48,
  },
  {
    id: "scanner_id",
    accessorKey: "scanner_id",
    filterFn: "fuzzy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Scanner Id
          <FaSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 100,
  },
  {
    id: "case_id",
    accessorKey: "case_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Case Id
          <FaSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 164,
  },
  {
    id: "slot_id",
    accessorKey: "slot_id",
    header: "Slot Id",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Created At",
  },
];

export function ScanJobsTableView({
  scanJobs,
  scanners,
  cases,
}: {
  scanJobs: ScanJobModel[];
  cases: CaseModel[];
  scanners: ScannerModel[];
}): JSX.Element {
  const [showAddJobForm, setShowAddJobForm] = useState(false);

  const tableInstance = useTableMain({
    data: scanJobs,
    columns: PatientColumnDef,
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center">
        <div>
          <Button onClick={() => setShowAddJobForm(true)}>
            Start New Scan
          </Button>
          {showAddJobForm && (
            <AddScanJobDialog
              closeDialog={() => setShowAddJobForm(false)}
              scanners={scanners}
              cases={cases}
            />
          )}
        </div>
        <div className="flex-1">
          <GlobalFilter tableInstance={tableInstance} />
        </div>
      </div>
      <TableMain tableInstance={tableInstance} />
      <Pagination tableInstance={tableInstance} />
    </div>
  );
}
