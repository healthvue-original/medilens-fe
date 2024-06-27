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
import { useAPI } from "@/context/APIProvider";
import { CasePayload } from "@/services/api/types";
import * as React from "react";

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
  const api = useAPI();

  const addCase = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const payload: CasePayload = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      patient_id: +patient_id,
      hospital_id: +hospital_id,
      created_by: 1,
    };

    setLoading(true);

    api.addCase(payload).then(() => {
      setLoading(false);
      closeDialog();
    });
  };

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
        <form className="flex flex-col gap-3 mt-8 " onSubmit={addCase}>
          <DialogHeader>
            <DialogTitle>Add Case</DialogTitle>
            <DialogDescription>Add entry for new Case</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="patient">Patient</Label>
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
            <Label htmlFor="hospital">Hospital</Label>
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
            <Button type="submit" loading={loading} loadingText="Saving...">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
