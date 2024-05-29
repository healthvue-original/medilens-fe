import { NavLink } from "react-router-dom";
import { DataTableDemo } from "../DataTable";
import { Button } from "../ui/button";

export default function PatientsList(): JSX.Element {
  return (
    <div className="p-8 h-full flex flex-col">
      <div >
        <Button>
          <NavLink to={"./add"}>Add Patient</NavLink>
        </Button>
      </div>
      <div className="flex-1">
        <DataTableDemo />
      </div>
    </div>
  );
}
