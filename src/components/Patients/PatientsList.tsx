import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

export default function PatientsList(): JSX.Element {
  return (
    <div>
      <Button>
        <NavLink to={"./add"}>Add Patient</NavLink>
      </Button>
    </div>
  );
}
