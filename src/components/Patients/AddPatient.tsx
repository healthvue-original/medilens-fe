import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function AddPatient(): JSX.Element {
  const [formErrors, setFormErrors] = useState({});
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormErrors({
      "patient-name": "Field is required",
    });
  };
  return (
    <div className="flex items-center justify-center h-full">
      <form className=" w-[600px]" onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Add Patient</CardTitle>
            <CardDescription>Add entry for new patients</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3 flex-col">
            <div>
              <Label htmlFor="patient-name">Name</Label>
              <Input id="patient-name" errorText={formErrors["patient-name"]} />
            </div>
            <div>
              <Label htmlFor="patient-name">Name</Label>
              <Input id="patient-name" errorText={formErrors["patient-name"]} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
