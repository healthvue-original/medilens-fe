import { useFetcher } from "react-router-dom";

import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { Hospital, Patient, User } from "@/services/api/models";
import { SelectPopover } from "../SelectPopover";
import { CasePayload } from "@/services/api/types";
import * as React from "react";
import { FormResponse } from "@/routes/types";
import { useGlobalState } from "@/context/GlobalStateProvider";

export default function AddCaseDialog({
  closeDialog,
  patients,
  hospitals,
  users,
}: {
  closeDialog: () => void;
  patients: Patient[];
  hospitals: Hospital[];
  users: User[];
}): JSX.Element | null {
  const [patient_id, setPatientId] = useState("");
  const [hospital_id, setHospitalId] = useState("");
  const [assignee_id, setAssignee] = useState("");

  const fetcher = useFetcher<FormResponse<CasePayload>>();

  const state = fetcher.state;
  const { success } = fetcher.data ?? {};

  const loading = state === "submitting";

  React.useEffect(() => {
    if (success) {
      closeDialog();
    }
  }, [success]);

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

  const transformedUsers = users.map((u) => ({
    ...u,
    value: `${u.email}`,
  }));

  return (
    <Dialog defaultOpen={true} onOpenChange={closeDialog}>
      <DialogContent className="h-full sm:h-auto sm:max-w-[425px]">
        <fetcher.Form
          method="POST"
          action="/cases"
          className="flex flex-col gap-3 mt-8 "
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
          <div>
            <Label htmlFor="assignee_id">Assignee</Label>
            <input
              name="assignee_id"
              className="invisible"
              id="assignee_id"
              value={assignee_id}
            />
            <div className=" w-full">
              <SelectPopover
                items={transformedUsers}
                btnLabel="Assignee"
                placeholder="Select Assignee"
                emptyMessage="No Users Found"
                onSelect={(item) => setAssignee(item.id)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" loading={loading} loadingText="Saving...">
              Save
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
