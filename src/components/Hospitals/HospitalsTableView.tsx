import { Hospital } from "./types";
import { FaSort } from "react-icons/fa";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { useTableMain } from "../TableView/useTable";
import TableMain from "../TableView/TableBody";
import { Pagination } from "../TableView/Pagination";
import { GlobalFilter } from "../TableView/GlobalFilter";
import { Button } from "../ui/button";
import { useState } from "react";
import AddHospitalDialog from "./AddHospitalDialog";
import { HospitalModel } from "@/services/api/models";

const HospitalColumnDef: ColumnDef<Hospital>[] = [
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
    id: "created_at",
    accessorKey: "created_at",
    header: "Created At",
  },
];

export function HospitalsTableView({
  hospitals,
}: {
  hospitals: HospitalModel[];
}): JSX.Element {
  const [showAddHospitalForm, setShowAddHospitalForm] = useState(false);
  const tableInstance = useTableMain({
    data: hospitals,
    columns: HospitalColumnDef,
  });

  return (
    <div className="w-full h-full flex flex-col">
      Settings
      <div className="flex items-center">
        <div>
          <Button onClick={() => setShowAddHospitalForm(true)}>Add Hospital</Button>
          {showAddHospitalForm && (
            <AddHospitalDialog
              closeDialog={() => setShowAddHospitalForm(false)}
              hospitals={hospitals}
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
