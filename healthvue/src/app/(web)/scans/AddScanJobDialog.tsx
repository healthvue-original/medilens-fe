"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { CaseModel, ScannerModel } from "@/services/api/models";
import { SelectPopover } from "@/components/SelectPopover";
import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addJob } from "@/app/actions";

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

export default function AddScanJobDialog({
  closeDialog,
  scanners,
  cases,
}: {
  closeDialog: () => void;
  cases: CaseModel[];
  scanners: ScannerModel[];
}): JSX.Element | null {
  const [case_id, setCaseId] = useState("");
  const [scanner_id, setScannerId] = useState("");
  const [slot_id, setSlotId] = useState("");

  const formErrors: FormErrors = {};
  const [formState, formAction] = useFormState(addJob, initialFormState);

  React.useEffect(() => {
    if (formState.message === "submitted") {
      closeDialog();
    }
  }, [formState]);

  const transformedScanners = scanners.map((p) => ({
    ...p,
    id: `${p.id}`,
    value: `${p.name} - ${p.id}`,
  }));

  const transformedCases = cases.map((h) => ({
    ...h,
    id: `${h.id}`,
    value: `${h.name} - ${h.id}`,
  }));

  const availableSlots = scanners
    ?.find((scanner) => scanner.id === +scanner_id)
    ?.slots.filter((slot) => slot.status === "available");

  return (
    <Dialog defaultOpen={true} onOpenChange={closeDialog}>
      <DialogContent className="h-full sm:h-auto sm:max-w-[425px]">
        <form className="flex flex-col gap-3 mt-8 " action={formAction}>
          <DialogHeader>
            <DialogTitle>Start Scan</DialogTitle>
            <DialogDescription>Add entry for new Scan</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="case_id">Case</Label>
            <input
              className="invisible"
              id="case_id"
              name="case_id"
              value={case_id}
            />
            <div className=" w-full">
              <SelectPopover
                items={transformedCases}
                btnLabel="Associate Case"
                placeholder="Select Case"
                emptyMessage="No Case Found"
                onSelect={(item) => setCaseId(item.id)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="scanner_id">Scanner</Label>
            <input
              className="invisible"
              id="scanner_id"
              name="scanner_id"
              value={scanner_id}
            />
            <div className=" w-full">
              <SelectPopover
                items={transformedScanners}
                btnLabel="Associate Scanner"
                placeholder="Select Scanner"
                emptyMessage="No Scanner Found"
                onSelect={(item) => setScannerId(item.id)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="slot_id">Slot</Label>
            <Select name="slot_id" value={slot_id} onValueChange={setSlotId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="---" />
              </SelectTrigger>
              <SelectContent>
                {availableSlots?.map((slot) => (
                  <SelectItem key={slot.id} value={String(slot.id)}>
                    {slot.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
