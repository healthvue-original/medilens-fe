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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddPatient(): JSX.Element {
  const [formErrors, setFormErrors] = useState({});
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit");

    setIsLoading(true);
    setFormErrors({
      "name": "Field is required",
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Patient</Button>
      </DialogTrigger>
      <DialogContent className="h-full sm:h-auto sm:max-w-[425px]">
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <DialogHeader>
            <DialogTitle>Add Patient</DialogTitle>
            <DialogDescription>Add entry for new patients</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="patient-name" errorText={formErrors["name"]} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" errorText={formErrors["email"]} />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" errorText={formErrors["age"]} />
          </div>
          <div>
            <Label htmlFor="sex">Sex</Label>
            <Input id="sex" errorText={formErrors["sex"]} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" errorText={formErrors["phone"]} />
          </div>
          <DialogFooter>
            <Button type="submit" loading={isLoading} loadingText="Saving...">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/*
    <div className="flex items-center justify-center h-full">
      <form className=" w-[440px]" onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Add Patient</CardTitle>
            <CardDescription>Add entry for new patients</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3 flex-col">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="patient-name" errorText={formErrors["name"]} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" errorText={formErrors["email"]} />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" errorText={formErrors["age"]} />
            </div>
            <div>
              <Label htmlFor="sex">Sex</Label>
              <Input id="sex" errorText={formErrors["sex"]} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" errorText={formErrors["phone"]} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
*/
