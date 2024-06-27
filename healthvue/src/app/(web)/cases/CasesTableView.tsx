"use client";
import { FaSort } from "react-icons/fa";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useTableMain } from "@/components/TableView/useTable";
import TableMain from "@/components/TableView/TableBody";
import { Pagination } from "@/components/TableView/Pagination";
import { GlobalFilter } from "@/components/TableView/GlobalFilter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddCaseDialog from "./AddCaseDialog";
import { CaseModel, HospitalModel, PatientModel } from "@/services/api/models";
import { useDialog } from "@/context/DialogProvider";
import CaseDetail from "./CaseDetail";

const CasesColumnDef: ColumnDef<CaseModel>[] = [
  {
    id: "id",
    accessorKey: "id",
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
    size: 164,
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button
          variant={"link"}
          onClick={(e) => {
            e.stopPropagation();
            window.open("/case-report");
          }}
        >
          Generate Report
        </Button>
      );
    },
  },
];

export function CasesTableView({
  cases,
  patients,
  hospitals,
}: {
  cases: CaseModel[];
  patients: PatientModel[];
  hospitals: HospitalModel[];
}): JSX.Element {
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);
  const tableInstance = useTableMain({
    data: cases,
    columns: CasesColumnDef,
  });

  const dialog = useDialog();

  const onRowClick = (row: Row<CaseModel>) => {
    const caseId = row.getValue("id");
    dialog.open(
      <CaseDetail
        caseObj={cases.find((c) => c.id === caseId)}
        closeDialog={dialog.close}
      />
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center">
        <div>
          <Button onClick={() => setShowAddPatientForm(true)}>Add Case</Button>
          {showAddPatientForm && (
            <AddCaseDialog
              closeDialog={() => setShowAddPatientForm(false)}
              patients={patients}
              hospitals={hospitals}
            />
          )}
        </div>
        <div className="flex-1">
          <GlobalFilter tableInstance={tableInstance} />
        </div>
      </div>
      <TableMain tableInstance={tableInstance} onRowClick={onRowClick} />
      <Pagination tableInstance={tableInstance} />
    </div>
  );
}
