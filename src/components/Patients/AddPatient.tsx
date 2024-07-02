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
import { useFetcher, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import { PatientPayload } from "@/services/api/types";
import { FormResponse } from "@/routes/types";

export default function AddPatientDialog({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element | null {
  const fetcher = useFetcher<FormResponse<PatientPayload>>();
  const { formErrors, success } = fetcher.data ?? {};

  const state = fetcher.state;

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success]);

  return (
    <Dialog defaultOpen={true} onOpenChange={onClose}>
      <DialogContent className="h-full sm:h-auto sm:max-w-[425px]">
        <fetcher.Form
          method="post"
          action="/patients"
          className="flex flex-col gap-3 mt-8 "
        >
          <DialogHeader>
            <DialogTitle>Add Patient</DialogTitle>
            <DialogDescription>Add entry for new patients</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" errorText={formErrors?.name} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" errorText={formErrors?.email} />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" name="age" errorText={formErrors?.age} />
          </div>
          <div>
            <Label htmlFor="sex">Sex</Label>
            <Input id="sex" name="sex" errorText={formErrors?.sex} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" errorText={formErrors?.phone} />
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
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
