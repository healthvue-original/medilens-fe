import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { useEffect } from "react";

export default function AddPatientDialog({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element | null {
  const { state } = useNavigation();
  const action = useActionData();
  const formErrors = action?.formErrors ?? {};
  useEffect(() => {
    if (state === "loading") {
      onClose();
    }
  }, [state]);
  return (
    <Dialog defaultOpen={true} onOpenChange={onClose}>
      <DialogContent className="h-full sm:h-auto sm:max-w-[425px]">
        <Form method="post" className="flex flex-col gap-3 mt-8 ">
          <DialogHeader>
            <DialogTitle>Add Patient</DialogTitle>
            <DialogDescription>Add entry for new patients</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" errorText={formErrors["name"]} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" errorText={formErrors["email"]} />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" name="age" errorText={formErrors["age"]} />
          </div>
          <div>
            <Label htmlFor="sex">Sex</Label>
            <Input id="sex" name="sex" errorText={formErrors["sex"]} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" errorText={formErrors["phone"]} />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              loading={state === "submitting"}
              loadingText="Saving..."
            >
              Save
            </Button>
          </DialogFooter>
        </Form>
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
