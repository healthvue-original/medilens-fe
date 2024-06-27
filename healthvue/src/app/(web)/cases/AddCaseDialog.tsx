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
import { useState } from "react";
import { HospitalModel, PatientModel } from "@/services/api/models";
import { SelectPopover } from "@/components/SelectPopover";
import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addCase } from "@/app/actions";

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

export default function AddCaseDialog({
  closeDialog,
  patients,
  hospitals,
}: {
  closeDialog: () => void;
  patients: PatientModel[];
  hospitals: HospitalModel[];
}): JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const [patient_id, setPatientId] = useState("");
  const [hospital_id, setHospitalId] = useState("");

  const formErrors: FormErrors = {};
  const [formState, formAction] = useFormState(addCase, initialFormState);

  React.useEffect(() => {
    if (formState.message === "submitted") {
      closeDialog();
    }
  }, [formState]);

  const transformedPatients = patients.map((p) => ({
    ...p,
    id: `${p.id}`,
    value: `${p.name} - ${p.id}`,
  }));

  const transformedHospitals = hospitals.map((h) => ({
    ...h,
    id: `${h.id}`,
    value: `${h.name} - ${h.id}`,
  }));

  return (
    <Dialog defaultOpen={true} onOpenChange={closeDialog}>
      <DialogContent className="h-full sm:h-auto sm:max-w-[425px]">
        <form
          method="post"
          className="flex flex-col gap-3 mt-8 "
          action={formAction}
        >
          <DialogHeader>
            <DialogTitle>Add Case</DialogTitle>
            <DialogDescription>Add entry for new Case</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="patient_id">Patient</Label>
            <input
              className="invisible"
              name="patient_id"
              id="patient_id"
              value={patient_id}
            />
            <div className=" w-full">
              <SelectPopover
                items={transformedPatients}
                btnLabel="Associate Patient"
                placeholder="Select Patient"
                emptyMessage="No Patient Found"
                onSelect={(item) => setPatientId(item.id)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" />
          </div>
          <div>
            <Label htmlFor="hospital_id">Hospital</Label>
            <input
              name="hospital_id"
              className="invisible"
              id="hospital_id"
              value={hospital_id}
            />
            <div className=" w-full">
              <SelectPopover
                items={transformedHospitals}
                btnLabel="Associate Hospital"
                placeholder="Select Hospital"
                emptyMessage="No Hospital Found"
                onSelect={(item) => setHospitalId(item.id)}
              />
            </div>
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
