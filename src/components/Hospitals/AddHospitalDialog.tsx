import { useRevalidator } from "react-router-dom";

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
import { HospitalModel } from "@/services/api/models";
import { useAPI } from "@/context/APIProvider";
import { HospitalPayload } from "@/services/api/types";
import * as React from "react";

export default function AddHospitalDialog({
  closeDialog,
}: {
  closeDialog: () => void;
  hospitals: HospitalModel[];
}): JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const revalidator = useRevalidator();
  const api = useAPI();

  const addHospital = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const payload: HospitalPayload = {
      name: formData.get("name") as string,
    };

    setLoading(true);

    api.addHospital(payload).then(() => {
      setLoading(false);
      revalidator.revalidate();
      closeDialog();
    });
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={closeDialog}>
      <DialogContent className="h-full sm:h-auto sm:max-w-[425px]">
        <form className="flex flex-col gap-3 mt-8 " onSubmit={addHospital}>
          <DialogHeader>
            <DialogTitle>Add a Hospital</DialogTitle>
            <DialogDescription>Add entry for new Hospital</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" />
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
