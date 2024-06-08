import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContentWithoutPortal,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

type ItemProp = {
  id: string;
  value: string;
};

type SelectPopoverProps = {
  items: ItemProp[];
  btnLabel: string;
  placeholder: string;
  emptyMessage: string;
  onSelect: (item: ItemProp) => void;
};

export function SelectPopover({
  items,
  btnLabel,
  placeholder,
  emptyMessage,
  onSelect,
}: SelectPopoverProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? items.find((item) => item.value === value)?.value : btnLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContentWithoutPortal asChild className="p-0 overflow-scroll">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            <CommandList className=" overflow-scroll">
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onSelect(item);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.value}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContentWithoutPortal>
    </Popover>
  );
}
