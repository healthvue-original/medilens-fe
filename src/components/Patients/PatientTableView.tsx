import { Patient } from "./types";
import { FaSort } from "react-icons/fa";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useTableMain } from "../TableView/useTable";
import TableMain from "../TableView/TableBody";
import { Pagination } from "../TableView/Pagination";
import { GlobalFilter } from "../TableView/GlobalFilter";
import { Button } from "../ui/button";

const PatientColumnDef: ColumnDef<Patient>[] = [
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
    size : 48
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
    size : 100
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
    size : 64,
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
];

export function PatientTableView({ data }: { data: Patient[] }): JSX.Element {
  const tableInstance = useTableMain({ data, columns: PatientColumnDef });

  return (
    <div className="w-full h-full flex flex-col">
      <GlobalFilter tableInstance={tableInstance} />
      <TableMain tableInstance={tableInstance} />
      <Pagination tableInstance={tableInstance} />
    </div>
  );
}
