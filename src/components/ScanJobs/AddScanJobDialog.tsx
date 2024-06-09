import { useRevalidator } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { CaseModel, ScannerModel } from "@/services/api/models";
import { SelectPopover } from "../SelectPopover";
import { useAPI } from "@/context/APIProvider";
import { ScanJobPayload } from "@/services/api/types";
import * as React from "react";

export default function AddScanJobDialog({
  closeDialog,
  scanners,
  cases,
}: {
  closeDialog: () => void;
  cases: CaseModel[];
  scanners: ScannerModel[];
}): JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const [case_id, setCaseId] = useState("");
  const [scanner_id, setScannerId] = useState("");
  const [slot_id, setSlotId] = useState("");
  const revalidator = useRevalidator();
  const api = useAPI();

  const addJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: ScanJobPayload = {
      scanner_id: +scanner_id,
      case_id: +case_id,
      slot_id: +slot_id,
    };

    setLoading(true);

    const createdJob = await api.addScanJob(payload);

    await api.addSpecimen({
      case_id: +case_id,
      job_id: createdJob.id,
      file_path: "scans/FDSSD43534GDFX",
      name: "Dummy",
      user_id: 1,
    });

    setLoading(false);
    revalidator.revalidate();
    closeDialog();
  };

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
        <form className="flex flex-col gap-3 mt-8 " onSubmit={addJob}>
          <DialogHeader>
            <DialogTitle>Start Scan</DialogTitle>
            <DialogDescription>Add entry for new Scan</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="case">Case</Label>
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
            <Label htmlFor="scanner">Scanner</Label>
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
            <Select name="slot_id" onValueChange={setSlotId}>
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
            <Button type="submit" loading={loading} loadingText="Saving...">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
