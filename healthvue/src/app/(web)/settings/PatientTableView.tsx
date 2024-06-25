"use client";
import { FaSort } from "react-icons/fa";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useTableMain } from "@/components/TableView/useTable";
import TableMain from "@/components/TableView/TableBody";
import { Pagination } from "@/components/TableView/Pagination";
import { GlobalFilter } from "@/components/TableView/GlobalFilter";
import { Button } from "@/components/ui/button";
import { PatientModel } from "@/services/api/models";
import { useDialog } from "@/context/DialogProvider";
import AddPatientDialog from "./AddPatient";

const PatientColumnDef: ColumnDef<PatientModel>[] = [
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
    id: "age",
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Age
          <FaSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 64,
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
    filterFn: "fuzzy",
  },
  {
    id: "sex",
    accessorKey: "sex",
    header: "Gender",
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: "Phone",
  },
];

export function PatientTableView({
  data,
}: {
  data: PatientModel[];
}): JSX.Element {
  const dialog = useDialog();
  const tableInstance = useTableMain({ data, columns: PatientColumnDef });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center">
        <div>
          <Button
            onClick={() =>
              dialog.open(<AddPatientDialog closeDialog={dialog.close} />)
            }
          >
            Add Patient
          </Button>
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
