import { NavLink } from "react-router-dom";
import { DataTableDemo } from "../DataTable";
import { Button } from "../ui/button";
import AddPatient from "./AddPatient";

export default function PatientsList(): JSX.Element {
  return (
    <div className="p-16 h-full flex flex-col">
      <div>
        <AddPatient />
      </div>
      <div style={{ height: "calc(100% - 100px)" }} className="flex-1">
        <DataTableDemo />
      </div>
    </div>
  );
}
