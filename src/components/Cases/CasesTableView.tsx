import { Case } from "./types";
import { FaSort } from "react-icons/fa";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { useTableMain } from "../TableView/useTable";
import TableMain from "../TableView/TableBody";
import { Pagination } from "../TableView/Pagination";
import { GlobalFilter } from "../TableView/GlobalFilter";
import { Button } from "../ui/button";
import { useState } from "react";
import AddCaseDialog from "./AddCaseDialog";
import { Patient } from "../Patients/types";

const PatientColumnDef: ColumnDef<Case>[] = [
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
    id: "name",
    accessorKey: "name",
    filterFn: "fuzzy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <FaSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 100,
  },
  {
    id: "description",
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <FaSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 64,
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Created At",
  },
];

export function CasesTableView({
  cases,
  patients,
}: {
  cases: Case[];
  patients: Patient[];
}): JSX.Element {
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);
  const tableInstance = useTableMain({
    data: cases,
    columns: PatientColumnDef,
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center">
        <div>
          <Button onClick={() => setShowAddPatientForm(true)}>Add Case</Button>
          {showAddPatientForm && (
            <AddCaseDialog
              onClose={() => setShowAddPatientForm(false)}
              patients={patients}
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
