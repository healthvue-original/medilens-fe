"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createPatient } from "../../actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";

const initialFormState = {
  message: "",
};

type FormErrors = {
  name?: string;
  email?: string;
  age?: string;
  sex?: string;
  phone?: string;
};

export default function AddPatientDialog({
  closeDialog,
}: {
  closeDialog: () => void;
}): JSX.Element | null {
  const formErrors: FormErrors = {};
  const [formState, formAction] = useFormState(createPatient, initialFormState);

  useEffect(() => {
    if (formState.message === "submitted") {
      closeDialog();
    }
  }, [formState]);

  return (
    <Dialog defaultOpen={true} onOpenChange={closeDialog}>
      <DialogContent className="h-full sm:h-auto sm:max-w-[425px]">
        <form
          method="post"
          action={formAction}
          className="flex flex-col gap-3 mt-8 "
        >
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
            <SubmitBtn />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitBtn(): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending} loadingText="Saving..">
      Save
    </Button>
  );
}
