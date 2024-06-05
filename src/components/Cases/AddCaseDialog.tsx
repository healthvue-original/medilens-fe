import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContentWithoutPortal,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Patient } from "../Patients/types";

export default function AddCaseDialog({
  onClose,
  patients,
}: {
  onClose: () => void;
  patients: Patient[];
}): JSX.Element | null {
  const { state } = useNavigation();
  const action = useActionData();
  const submit = useSubmit();
  const formErrors = action?.formErrors ?? {};
  const [patientId, setPatientId] = useState("");

  const addCase = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    submit(
      { patientId, ...Object.fromEntries(formData.entries()) },
      {
        method: "POST",
      }
    );
  };

  useEffect(() => {
    if (state === "loading") {
      onClose();
    }
  }, [state]);
  return (
    <Dialog defaultOpen={true} onOpenChange={onClose}>
      <DialogContent className="h-full sm:h-auto sm:max-w-[425px]">
        <form className="flex flex-col gap-3 mt-8 " onSubmit={addCase}>
          <DialogHeader>
            <DialogTitle>Add Case</DialogTitle>
            <DialogDescription>Add entry for new Case</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4">
            <Label htmlFor="name">Patient</Label>
            <PatientList patients={patients} setPatientId={setPatientId} />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" errorText={formErrors["name"]} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              errorText={formErrors["description"]}
            />
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
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function PatientList({
  patients,
  setPatientId,
}: {
  patients: Patient[];
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(patients);

  const searchPatient = (e: InputEvent) => {
    const value = e.target?.value ?? "";
    if (!value) {
      setFilteredPatients(patients);
    }
    setFilteredPatients(patients.filter((pt) => pt.name.startsWith(value)));
  };

  useEffect(() => {
    if (!open) {
      setFilteredPatients(patients);
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? patients.find((patient) => String(patient.id) === value)?.name
            : "Associate Patient..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContentWithoutPortal
        asChild
        className="w-[200px] p-0 overflow-scroll"
      >
        <Command>
          <Input
            name="patient"
            placeholder="Search Patient..."
            className=" focus-visible:ring-0"
            onChange={searchPatient}
          />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandList className=" overflow-scroll">
              {filteredPatients.map((patient) => (
                <CommandItem
                  key={patient.id}
                  value={String(patient.id)}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setPatientId(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === String(patient.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {patient.name} ({patient.id})
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContentWithoutPortal>
    </Popover>
  );
}
